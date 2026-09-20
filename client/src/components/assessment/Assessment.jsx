import { useState } from "react";
import assessmentData from "./assessmentData";
import {
  calculateSelectedSkillsResults,
  handleSkillSelection
} from "./assessmentLogic";

function Assessment({ learnerId = null, selectedSkills: initialSkills = [], domain = "", onComplete = null }) {
  const [selectedSkills, setSelectedSkills] = useState(initialSkills);
  const [noneSelected, setNoneSelected] = useState(false); 
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);

const currentSkill = selectedSkills[currentSkillIndex];
  const [answers, setAnswers] = useState([]);
  const [results, setResults] = useState(null);
  const [answersBySkill, setAnswersBySkill] = useState({});

const questions = currentSkill
  ? assessmentData[currentSkill]
  : [];

  const skills = [
    "HTML",
    "CSS",
    "JavaScript",
    "Git/GitHub",
    "React"
  ];

  return (
    <div>
      <h1>Web Development Assessment</h1>
 {!started && (
    <>
      <p>Select the skills you already know:</p>
     

      {skills.map((skill) => (
        <label key={skill}>
          <input
            type="checkbox"
            value={skill}
            checked={selectedSkills.includes(skill)}
           onChange={() => {
  setNoneSelected(false);

  if (selectedSkills.includes(skill)) {
    setSelectedSkills(
      selectedSkills.filter((item) => item !== skill)
    );
  } else {
    setSelectedSkills([...selectedSkills, skill]);
  }
}}
          />
          {skill}
        </label>
      ))}

      <br />

   <label>
  <input
    type="checkbox"
    checked={noneSelected}
   onChange={() => {
  const newValue = !noneSelected;

  setNoneSelected(newValue);

  if (newValue) {
    setSelectedSkills([]);
    setCurrentSkillIndex(0);
    setCurrentQuestion(0);
    setAnswers([]);
    setAnswersBySkill({});
    handleSkillSelection(["None of the above"]);
  }
}}
  />
  None of the above
</label>
      <br /><br />

   <button
  onClick={() => {
    if (noneSelected) {
      return;
    }

    if (selectedSkills.length === 0) {
      alert("Please select at least one skill or choose None of the above.");
      return;
    }

    setStarted(true);
  }}
>
  Continue
</button>
</>
)}
{started && !noneSelected && !results && questions.length > 0 && (
  <div>
    <h2>{currentSkill}</h2>
 <p>
  Skill {currentSkillIndex + 1} of {selectedSkills.length}
</p>

<p>
  Question {currentQuestion + 1} of {questions.length}
</p>
<p>
  Answered: {answers.filter(Boolean).length} / {questions.length}
</p>

<progress
  value={currentQuestion + 1}
  max={questions.length}
></progress>

    <h3>{questions[currentQuestion].question}</h3>

    {questions[currentQuestion].options.map((option) => (
      <label key={option}>
       <input
  type="radio"
  name="answer"
  value={option}
  checked={answers[currentQuestion] === option}
onChange={() => {
  const updatedAnswers = [...answers];
  updatedAnswers[currentQuestion] = option;

  setAnswers(updatedAnswers);

  setAnswersBySkill({
    ...answersBySkill,
    [currentSkill]: updatedAnswers
  });
}}
/>
        {option}
      </label>
    ))}<button
  onClick={() => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  }}
>
  Previous
</button><button
onClick={() => {
  if (!answers[currentQuestion]) {
    alert("Please select an answer before continuing.");
    return;
  }

  if (currentQuestion < questions.length - 1) {
    setCurrentQuestion(currentQuestion + 1);
  } else {
    const finalAnswersBySkill = {
      ...answersBySkill,
      [currentSkill]: answers
    };

    setAnswersBySkill(finalAnswersBySkill);

    if (currentSkillIndex < selectedSkills.length - 1) {
      setCurrentSkillIndex(currentSkillIndex + 1);
      setCurrentQuestion(0);
      setAnswers([]);
    } else {
      const calculatedResults = calculateSelectedSkillsResults(
        selectedSkills,
        finalAnswersBySkill,
        assessmentData
      );

      if (learnerId) {
        fetch('/api/assessments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            learnerId,
            results: calculatedResults,
          }),
        }).catch((error) => {
          console.error('Assessment save failed:', error);
        });
      }

      setResults(calculatedResults);
    }
  }
}}
>{currentQuestion < questions.length - 1
  ? "Next"
  : currentSkillIndex < selectedSkills.length - 1
  ? "Next Skill"
  : "Submit"}
</button>

  </div>
)}

{noneSelected && !started && (
  <div>
    <h2>No existing skills selected</h2>

    <p>
      You can continue to the beginner roadmap.
    </p>

   <button
  onClick={() => {
    if (onComplete) {
      onComplete({});
    }
  }}
>
  Continue to Beginner Roadmap
</button>
  </div>
)}{results && (
  <div>
    <h2>Assessment Results</h2>

    <p>Your current skill levels:</p>

    {Object.entries(results).map(([skill, result]) => (
      <div key={skill}>
        <h3>{skill}</h3>

        <p>
          Proficiency: {result.proficiency}%
        </p>

        <p>
          Skill Gap: {result.skillGap}%
        </p>

        <hr />
      </div>
    ))}<button
  onClick={() => {
    setResults(null);
    setStarted(false);
    setCurrentSkillIndex(0);
    setCurrentQuestion(0);
    setAnswers([]);
    setAnswersBySkill({});
    setSelectedSkills([]);
    setNoneSelected(false);
  }}
>
  Retake Assessment
</button><button
  onClick={() => {
    if (onComplete) {
      onComplete(results);
    }
  }}
>
  Continue to Roadmap
</button>
  </div>
)}
    </div>
  );
}

export default Assessment;
