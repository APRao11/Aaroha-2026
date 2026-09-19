const express = require("express");
const db = require("../database/database");

const router = express.Router();

router.post("/", (req, res) => {
  const { learnerId, results } = req.body;

  if (!learnerId || !results) {
    return res.status(400).json({
      error: "learnerId and results are required"
    });
  }

  const insert = db.prepare(`
    INSERT INTO assessment_results
    (learner_id, skill, correct_answers, total_questions, proficiency, skill_gap)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const insertMany = db.transaction((results) => {
    for (const skill of Object.keys(results)) {
      const result = results[skill];

      insert.run(
        learnerId,
        skill,
        result.correctAnswers,
        result.totalQuestions,
        result.proficiency,
        result.skillGap
      );
    }
  });

  insertMany(results);

  res.status(201).json({
    message: "Assessment results saved successfully"
  });
});

module.exports = router;