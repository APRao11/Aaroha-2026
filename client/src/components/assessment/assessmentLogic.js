
function calculateSkillResult(questions, answers) {
  let correctAnswers = 0;

for (let i = 0; i < questions.length; i++) {
  if (answers[i] === questions[i].correctAnswer) {
    correctAnswers++;
  }
}
const totalQuestions = questions.length;
const proficiency = (correctAnswers / totalQuestions) * 100;
const skillGap = 100 - proficiency;
return {
  correctAnswers,
  totalQuestions,
  proficiency,
  skillGap
};
}
function handleSkillSelection(selectedSkills) {
  if (
    selectedSkills.length === 1 &&
    selectedSkills[0] === "None of the above"
  ) {
    return {
      isBeginner: true,
      assessmentRequired: false
    };
  }
 return {
    isBeginner: false,
    assessmentRequired: true
  };
}
  function calculateSelectedSkillsResults(selectedSkills, answersBySkill, assessmentData) {
const results = {};
for (const skill of selectedSkills) {
const questions = assessmentData[skill];
const answers = answersBySkill[skill];
const result = calculateSkillResult(questions, answers);
results[skill] = result;
}
return results;
}

 




export {
  calculateSkillResult,
  handleSkillSelection,
  calculateSelectedSkillsResults
};
