import express from "express";
import bcrypt from "bcryptjs";
import db from "./db.js";

const app = express();
const port = 3001;
app.use(express.json());

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

// register
app.post("/register", async (req, res) => {
  console.log(req.body)
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: "Missing fields" });
  }
  const hash = await bcrypt.hash(password, 10);
  try {
    const info = db
      .prepare("INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)")
      .run(username, email, hash);
    res.status(201).json({ id: info.lastInsertRowid, username });
  } catch (err) {
    if (String(err.message).includes("UNIQUE")) {
      return res.status(409).json({ error: "Username or email taken" });
    }
    throw err;
  }
});

// create a post
app.post("/posts", (req, res) => {
  const { userId, body } = req.body; // temporary: replace with auth later
  if (!body || body.length > 280) {
    return res.status(400).json({ error: "Body must be 1-280 characters" });
  }
  const info = db
    .prepare("INSERT INTO posts (user_id, body) VALUES (?, ?)")
    .run(userId, body);
  res.status(201).json({ id: info.lastInsertRowid });
});

// follow a user
app.post("/follow", (req, res) => {
  const { followerId, followeeId } = req.body;
  db.prepare("INSERT OR IGNORE INTO follows (follower_id, followee_id) VALUES (?, ?)")
    .run(followerId, followeeId);
  res.sendStatus(204);
});

app.post("/like", (req, res) => {
  const { userId, postId } = req.body;
  const existing = db
    .prepare("SELECT 1 FROM likes WHERE user_id = ? AND post_id = ?")
    .get(userId, postId);
  if (existing) {
    db.prepare("DELETE FROM likes WHERE user_id = ? AND post_id = ?").run(userId, postId);
    return res.json({ liked: false });
  }
  db.prepare("INSERT INTO likes (user_id, post_id) VALUES (?, ?)").run(userId, postId);
  res.json({ liked: true });
});

// mixed feed: each page = 10 trending + 5 new, interleaved
app.get("/posts", (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const TRENDING_PER_PAGE = 10;
  const NEW_PER_PAGE = 5;

  const candidates = db.prepare(`
    SELECT p.id, p.body, p.created_at, u.username,
      (SELECT COUNT(*) FROM likes l WHERE l.post_id = p.id) AS likes,
      (SELECT COUNT(*) FROM posts r WHERE r.reply_to = p.id) AS replies,
      (julianday('now') - julianday(p.created_at)) * 24 AS age_hours
    FROM posts p
    JOIN users u ON u.id = p.user_id
    WHERE p.reply_to IS NULL
    ORDER BY p.id DESC
    LIMIT 500
  `).all();

  const score = (p) => (p.likes + 2 * p.replies + 1) / Math.pow(p.age_hours + 2, 1.5);

  const byTrending = [...candidates].sort((a, b) => score(b) - score(a));
  const byNewest = candidates; // already newest-first

  // Walk through pages 1..page so a post never repeats across pages,
  // even if it ranks high in both lists.
  const used = new Set();
  let t = 0, n = 0;
  let posts = [];

  for (let p = 1; p <= page; p++) {
    const trending = [];
    while (trending.length < TRENDING_PER_PAGE && t < byTrending.length) {
      const c = byTrending[t++];
      if (!used.has(c.id)) { used.add(c.id); trending.push(c); }
    }
    const fresh = [];
    while (fresh.length < NEW_PER_PAGE && n < byNewest.length) {
      const c = byNewest[n++];
      if (!used.has(c.id)) { used.add(c.id); fresh.push(c); }
    }

    // interleave: 2 trending, 1 new, 2 trending, 1 new...
    posts = [];
    let f = 0;
    trending.forEach((c, i) => {
      posts.push({ ...c, source: "trending" });
      if (i % 2 === 1 && f < fresh.length) posts.push({ ...fresh[f++], source: "new" });
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
app.get("/timeline/:userId", (req, res) => {
  const userId = Number(req.params.userId);
  const before = Number(req.query.before) || Number.MAX_SAFE_INTEGER;
  const rows = db.prepare(`
    SELECT p.id, p.body, p.created_at, u.username
    FROM posts p
    JOIN users u ON u.id = p.user_id
    WHERE (p.user_id IN (SELECT followee_id FROM follows WHERE follower_id = ?)
           OR p.user_id = ?)
      AND p.id < ?
    ORDER BY p.id DESC
    LIMIT 20
  `).all(userId, userId, before);
  res.json(rows);
});

app.listen(port, () => console.log("Running on http://localhost:" + port));