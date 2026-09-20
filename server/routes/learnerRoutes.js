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

router.get("/:id/skill-gap", (req, res) => {
  const { id } = req.params;

  const results = db.prepare(`
    SELECT skill, proficiency, skill_gap
    FROM assessment_results
    WHERE learner_id = ?
  `).all(id);

  const skillGaps = {};

  for (const result of results) {
    skillGaps[result.skill] = {
      proficiency: result.proficiency,
      skillGap: result.skill_gap
    };
  }

  res.json(skillGaps);
});

router.post("/:id/skills", (req, res) => {
  const { id } = req.params;
  const { domain, skills } = req.body;

  if (!domain || !Array.isArray(skills)) {
    return res.status(400).json({
      error: "domain and skills are required"
    });
  }

  const learner = db
    .prepare("SELECT id FROM learners WHERE id = ?")
    .get(id);

  if (!learner) {
    return res.status(404).json({
      error: "Learner not found"
    });
  }

  const insert = db.prepare(`
    INSERT INTO learner_skills (learner_id, domain, skill)
    VALUES (?, ?, ?)
  `);

  const insertMany = db.transaction((skills) => {
    for (const skill of skills) {
      insert.run(id, domain, skill);
    }
  });

  insertMany(skills);

  res.status(201).json({
    message: "Skills saved successfully"
  });
});

router.get("/:id/skills", (req, res) => {
  const { id } = req.params;

  const skills = db.prepare(`
    SELECT domain, skill
    FROM learner_skills
    WHERE learner_id = ?
  `).all(id);

  res.json(skills);
});

module.exports = router;