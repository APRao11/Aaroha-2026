const express = require("express");
const db = require("../database/database");

const router = express.Router();

router.get("/", (req, res) => {
  const learners = db.prepare("SELECT * FROM learners").all();

  res.json(learners);
});

router.post("/", (req, res) => {
  const { name, email } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  const stmt = db.prepare(
    "INSERT INTO learners (name, email) VALUES (?, ?)"
  );

  const result = stmt.run(name, email);

  res.status(201).json({
    id: result.lastInsertRowid,
    name,
    email
  });
});

module.exports = router;