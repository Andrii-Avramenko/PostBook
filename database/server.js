import express from "express";
import bcrypt from "bcryptjs";
import db from "./db.js";
import cors from "cors";
import "dotenv/config";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error("JWT_SECRET missing in .env");

function signToken(user) {
  return jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "7d" });
}

// protects a route and sets req.user.id
function requireAuth(req, res, next) {
  const [type, token] = (req.headers.authorization || "").split(" ");
  if (type !== "Bearer" || !token) {
    return res.status(401).json({ error: "Not logged in" });
  }
  try {
    req.user = jwt.verify(token, JWT_SECRET); // { id, iat, exp }
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}

const app = express();
app.use(cors());
const port = 3001;
app.use(express.json());

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  next();
});

// register
app.post("/register", async (req, res) => {
  console.log(req.body);
  const { username, email, password, conpassword } = req.body;
  if (!username || !email || !password || !conpassword) {
    return res.status(400).json({ error: "Missing fields" });
  } else if (conpassword !== password) {
    return res.status(402).json({ error: "Passwords does not match" });
  }
  const hash = await bcrypt.hash(password, 10);
  try {
    const info = db
      .prepare(
        "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)",
      )
      .run(username, email, hash);
    res.status(201).json({
      token: signToken({ id: Number(info.lastInsertRowid) }),
      user: { id: Number(info.lastInsertRowid), username },
    });
  } catch (err) {
    if (String(err.message).includes("UNIQUE")) {
      return res.status(409).json({ error: "Username or email taken" });
    }
    throw err;
  }
});

app.post("/login", async (req, res) => {
  const { identifier, password } = req.body; // username or email
  if (!identifier || !password) {
    return res.status(400).json({ error: "Missing fields" });
  }
  const user = db
    .prepare(
      "SELECT id, username, bio, password_hash FROM users WHERE username = ? OR email = ?",
    )
    .get(identifier, identifier);

  const ok = user && (await bcrypt.compare(password, user.password_hash));
  if (!ok) {
    return res.status(401).json({ error: "Wrong username/email or password" });
  }
  res.json({
    token: signToken(user),
    user: { id: user.id, username: user.username, bio: user.bio },
  });
});

// who am I (useful on page load to check a saved token)
app.get("/me", requireAuth, (req, res) => {
  const user = db
    .prepare("SELECT id, username, bio, created_at FROM users WHERE id = ?")
    .get(req.user.id);
  if (!user) return res.status(401).json({ error: "User no longer exists" });
  res.json(user);
});

// create a post
app.post("/posts", requireAuth, (req, res) => {
  const { body } = req.body;
  if (!body || body.length > 280) {
    return res.status(400).json({ error: "Body must be 1-280 characters" });
  }
  const info = db
    .prepare("INSERT INTO posts (user_id, body) VALUES (?, ?)")
    .run(req.user.id, body);
  res.status(201).json({ id: Number(info.lastInsertRowid) });
});

// follow a user
app.post("/follow", requireAuth, (req, res) => {
  const { followeeId } = req.body;
  db.prepare("INSERT OR IGNORE INTO follows (follower_id, followee_id) VALUES (?, ?)")
    .run(req.user.id, followeeId);
  res.sendStatus(204);
});

app.post("/like", requireAuth, (req, res) => {
  const { postId } = req.body;
  const userId = req.user.id;
  const existing = db
    .prepare("SELECT 1 FROM likes WHERE user_id = ? AND post_id = ?")
    .get(userId, postId);
  if (existing) {
    db.prepare("DELETE FROM likes WHERE user_id = ? AND post_id = ?").run(
      userId,
      postId,
    );
    return res.json({ liked: false });
  }
  db.prepare("INSERT INTO likes (user_id, post_id) VALUES (?, ?)").run(
    userId,
    postId,
  );
  res.json({ liked: true });
});

// turns a flat row into { ...post, author: {...} }
function withAuthor(row) {
  const { author_id, username, bio, author_created_at, ...post } = row;
  return {
    ...post,
    author: {
      id: author_id,
      username,
      bio,
      joined: author_created_at,
    },
  };
}

// mixed feed: each page = 10 trending + 5 new, interleaved
app.get("/posts", (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const TRENDING_PER_PAGE = 10;
  const NEW_PER_PAGE = 5;

  const candidates = db
    .prepare(
      `
  SELECT p.id, p.body, p.created_at,
    u.id AS author_id, u.username, u.bio, u.created_at AS author_created_at,
    (SELECT COUNT(*) FROM likes l WHERE l.post_id = p.id) AS likes,
    (SELECT COUNT(*) FROM posts r WHERE r.reply_to = p.id) AS replies,
    (julianday('now') - julianday(p.created_at)) * 24 AS age_hours
  FROM posts p
  JOIN users u ON u.id = p.user_id
  WHERE p.reply_to IS NULL
  ORDER BY p.id DESC
  LIMIT 500
`,
    )
    .all()
    .map(withAuthor);

  const score = (p) =>
    (p.likes + 2 * p.replies + 1) / Math.pow(p.age_hours + 2, 1.5);

  const byTrending = [...candidates].sort((a, b) => score(b) - score(a));
  const byNewest = candidates; // already newest-first

  // Walk through pages 1..page so a post never repeats across pages,
  // even if it ranks high in both lists.
  const used = new Set();
  let t = 0,
    n = 0;
  let posts = [];

  for (let p = 1; p <= page; p++) {
    const trending = [];
    while (trending.length < TRENDING_PER_PAGE && t < byTrending.length) {
      const c = byTrending[t++];
      if (!used.has(c.id)) {
        used.add(c.id);
        trending.push(c);
      }
    }
    const fresh = [];
    while (fresh.length < NEW_PER_PAGE && n < byNewest.length) {
      const c = byNewest[n++];
      if (!used.has(c.id)) {
        used.add(c.id);
        fresh.push(c);
      }
    }

    // interleave: 2 trending, 1 new, 2 trending, 1 new...
    posts = [];
    let f = 0;
    trending.forEach((c, i) => {
      posts.push({ ...c, source: "trending" });
      if (i % 2 === 1 && f < fresh.length)
        posts.push({ ...fresh[f++], source: "new" });
    });
    while (f < fresh.length) posts.push({ ...fresh[f++], source: "new" });
  }

  res.json({
    page,
    hasMore: used.size < candidates.length,
    posts,
  });
});

// home timeline (cursor pagination via ?before=<post id>)
app.get("/timeline/:userId", requireAuth, (req, res) => {
  const userId = req.user.id;
  const before = Number(req.query.before) || Number.MAX_SAFE_INTEGER;
  const rows = db
    .prepare(
      `
  SELECT p.id, p.body, p.created_at,
    u.id AS author_id, u.username, u.bio, u.created_at AS author_created_at
  FROM posts p
  JOIN users u ON u.id = p.user_id
  WHERE (p.user_id IN (SELECT followee_id FROM follows WHERE follower_id = ?)
         OR p.user_id = ?)
    AND p.id < ?
  ORDER BY p.id DESC
  LIMIT 20
`,
    )
    .all(userId, userId, before)
    .map(withAuthor);
  res.json(rows);
});

app.listen(port, () => console.log("Running on http://localhost:" + port));
