const webDevelopmentRoadmap = [
  {
    technology: "HTML",
    topics: [
      {
        name: "HTML Basics",
        tasks: [
          "Learn HTML document structure",
          "Learn basic HTML tags",
          "Create a simple webpage"
        ]
      },
      {
        name: "Links and Images",
        tasks: [
          "Learn links",
          "Learn images",
          "Create a webpage with links and images"
        ]
      },
      {
        name: "Lists and Tables",
        tasks: [
          "Learn ordered and unordered lists",
          "Learn HTML tables",
          "Create a webpage using lists and tables"
        ]
      },
      {
        name: "Forms",
        tasks: [
          "Learn form elements",
          "Learn input types",
          "Create a basic HTML form"
        ]
      },
      {
        name: "Semantic HTML",
        tasks: [
          "Learn semantic elements",
          "Understand page structure",
          "Build a semantic webpage"
        ]
      }
    ]
  },

  {
    technology: "CSS",
    topics: [
      {
        name: "CSS Basics",
        tasks: [
          "Learn selectors",
          "Learn colors and backgrounds",
          "Style a basic webpage"
        ]
      },
      {
        name: "Box Model",
        tasks: [
          "Learn margin",
          "Learn padding",
          "Learn borders"
        ]
      },
      {
        name: "Layouts",
        tasks: [
          "Learn Flexbox",
          "Learn CSS Grid",
          "Build a responsive layout"
        ]
      },
      {
        name: "Responsive Design",
        tasks: [
          "Learn media queries",
          "Make webpages responsive",
          "Test layouts on different screen sizes"
        ]
      }
    ]
  },

  {
    technology: "JavaScript",
    topics: [
      {
        name: "JavaScript Basics",
        tasks: [
          "Learn variables and data types",
          "Learn operators",
          "Learn conditional statements"
        ]
      },
      {
        name: "Functions and Arrays",
        tasks: [
          "Learn functions",
          "Learn arrays",
          "Practice array methods"
        ]
      },
      {
        name: "Objects and DOM",
        tasks: [
          "Learn objects",
          "Learn DOM manipulation",
          "Handle button and form events"
        ]
      },
      {
        name: "Asynchronous JavaScript",
        tasks: [
          "Understand promises",
          "Learn async and await",
          "Learn basic API requests"
        ]
      }
    ]
  },

  {
    technology: "Git/GitHub",
    topics: [
      {
        name: "Git Basics",
        tasks: [
          "Learn repositories",
          "Learn commits",
          "Practice basic Git commands"
        ]
      },
      {
        name: "GitHub",
        tasks: [
          "Create a GitHub repository",
          "Push code to GitHub",
          "Learn branches"
        ]
      },
      {
        name: "Collaboration",
        tasks: [
          "Learn pull requests",
          "Learn merging",
          "Practice a basic team workflow"
        ]
      }
    ]
  },

  {
    technology: "React",
    topics: [
      {
        name: "React Basics",
        tasks: [
          "Understand components",
          "Create a React application",
          "Create reusable components"
        ]
      },
      {
        name: "Props and State",
        tasks: [
          "Learn props",
          "Learn state",
          "Handle user interactions"
        ]
      },
      {
        name: "React Hooks",
        tasks: [
          "Learn useState",
          "Learn useEffect",
          "Practice React hooks"
        ]
      },
      {
        name: "React Project",
        tasks: [
          "Build a small React application",
          "Organize React components",
          "Complete a final Web Development project"
        ]
      }
    ]
  }
];

/*
 * Converts assessment proficiency into the skill level
 * expected by the personalized roadmap.
 *
 * Assessment result:
 *     proficiency percentage
 *
 * Roadmap input:
 *     "beginner" or "intermediate"
 */
export function proficiencyToSkillLevel(proficiency) {
  if (proficiency === undefined || proficiency === null) {
    return "none";
  }

  if (proficiency >= 70) {
    return "intermediate";
  }

  return "beginner";
}

/*
 * Converts assessment results for multiple technologies
 * into the skillLevels format used by getPersonalizedRoadmap().
 *
 * Example input:
 *
 * {
 *   HTML: { proficiency: 80 },
 *   CSS: { proficiency: 45 },
 *   JavaScript: { proficiency: 20 }
 * }
 *
 * becomes:
 *
 * {
 *   HTML: "intermediate",
 *   CSS: "beginner",
 *   JavaScript: "beginner"
 * }
 */
export function convertAssessmentResultsToSkillLevels(
  assessmentResults
) {
  const skillLevels = {};

  Object.entries(assessmentResults || {}).forEach(
    ([skill, result]) => {
      skillLevels[skill] = proficiencyToSkillLevel(
        result.proficiency
      );
    }
  );

  return skillLevels;
}

export function getPersonalizedRoadmap(skillLevels) {
  return webDevelopmentRoadmap.map((technology) => {
    const level = skillLevels[technology.technology] || "none";

    let startIndex = 0;

    if (level === "beginner") {
      startIndex = 1;
    }

    if (level === "intermediate") {
      startIndex = 2;
    }

    const personalizedTopics = technology.topics.slice(startIndex);

    return {
      ...technology,
      level,
      topics: personalizedTopics
    };
  });
}

export function createProgress(roadmap) {
  const progress = {};

  roadmap.forEach((technology) => {
    progress[technology.technology] = {};

    technology.topics.forEach((topic) => {
      progress[technology.technology][topic.name] = {};

      topic.tasks.forEach((task, index) => {
        progress[technology.technology][topic.name][index] = {
          task,
          status: "not-started"
        };
      });
    });
  });

  return progress;
}

export function updateTaskStatus(
  progress,
  technology,
  topic,
  taskIndex,
  status
) {
  if (
    !progress[technology] ||
    !progress[technology][topic] ||
    !progress[technology][topic][taskIndex]
  ) {
    return progress;
  }

  return {
    ...progress,
    [technology]: {
      ...progress[technology],
      [topic]: {
        ...progress[technology][topic],
        [taskIndex]: {
          ...progress[technology][topic][taskIndex],
          status
        }
      }
    }
  };
}

export function calculateProgress(progress) {
  let totalTasks = 0;
  let completedTasks = 0;

  Object.values(progress).forEach((technology) => {
    Object.values(technology).forEach((topic) => {
      Object.values(topic).forEach((task) => {
        totalTasks++;

        if (task.status === "completed") {
          completedTasks++;
        }
      });
    });
  });

  if (totalTasks === 0) {
    return 0;
  }

  return Math.round((completedTasks / totalTasks) * 100);
}

export function getAdaptiveTimeline(progress, originalDays = 30) {
  let incompleteTasks = 0;

  Object.values(progress).forEach((technology) => {
    Object.values(technology).forEach((topic) => {
      Object.values(topic).forEach((task) => {
        if (task.status !== "completed") {
          incompleteTasks++;
        }
      });
    });
  });

  const extraDays = Math.ceil(incompleteTasks / 3);

  return {
    originalDays,
    extraDays,
    totalDays: originalDays + extraDays
  };
}

export default webDevelopmentRoadmap;