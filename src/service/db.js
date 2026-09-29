import { DatabaseSync } from "node:sqlite";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const db = new DatabaseSync(path.join(__dirname, "app.db"));
db.exec("PRAGMA foreign_keys = ON; PRAGMA journal_mode = WAL;");

const schema = fs
  .readFileSync(path.join(__dirname, "schema.sql"), "utf8")
  .replace(/CREATE TABLE /g, "CREATE TABLE IF NOT EXISTS ")
  .replace(/CREATE INDEX /g, "CREATE INDEX IF NOT EXISTS ");
db.exec(schema);

export default db;