const Database = require("better-sqlite3");
const db = new Database("./database/aaroha.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS learners (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT
  ),
  CREATE TABLE IF NOT EXISTS assessment_results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    learner_id INTEGER NOT NULL,
    skill TEXT NOT NULL,
    correct_answers INTEGER NOT NULL,
    total_questions INTEGER NOT NULL,
    proficiency REAL NOT NULL,
    skill_gap REAL NOT NULL,
    FOREIGN KEY (learner_id) REFERENCES learners(id)
    )
`);

console.log("Database connected successfully!");
module.exports = db;
