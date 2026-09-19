const Database = require("better-sqlite3");
const db = new Database("./database/aaroha.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS learners (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT
  )
`);

console.log("Database connected successfully!");
module.exports = db;