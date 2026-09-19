import { useMemo, useState } from "react";
import {
  getPersonalizedRoadmap,
  createProgress,
  updateTaskStatus,
  calculateProgress,
} from "../../data/roadmap";

function Roadmap({ skillLevels = {} }) {
  const roadmap = useMemo(
    () => getPersonalizedRoadmap(skillLevels),
    [skillLevels]
  );

  const [progress, setProgress] = useState(() => createProgress(roadmap));
  const [expandedTechnology, setExpandedTechnology] = useState(null);
  const [expandedTopic, setExpandedTopic] = useState(null);

  const overallProgress = calculateProgress(progress);

  const toggleTechnology = (technology) => {
    setExpandedTechnology((current) =>
      current === technology ? null : technology
    );
  };

  const toggleTopic = (technology, topic) => {
    const key = `${technology}-${topic}`;

    setExpandedTopic((current) =>
      current === key ? null : key
    );
  };

  const handleTaskStatusChange = (
    technology,
    topic,
    taskIndex,
    status
  ) => {
    setProgress((currentProgress) =>
      updateTaskStatus(
        currentProgress,
        technology,
        topic,
        taskIndex,
        status
      )
    );
  };

  return (
    <section className="roadmap">
      <div className="roadmap-header">
        <h1>Personalized Web Development Roadmap</h1>

        <p>
          Follow your personalized roadmap and track your learning progress.
        </p>

        <div className="progress-section">
          <div className="progress-info">
            <span>Overall Progress</span>
            <strong>{overallProgress}%</strong>
          </div>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="roadmap-list">
        {roadmap.map((technology) => {
          const isTechnologyExpanded =
            expandedTechnology === technology.technology;

          return (
            <div
              className="roadmap-technology"
              key={technology.technology}
            >
              <button
                type="button"
                className="technology-button"
                onClick={() =>
                  toggleTechnology(technology.technology)
                }
              >
                <span>{technology.technology}</span>
                <span>{isTechnologyExpanded ? "−" : "+"}</span>
              </button>

              {isTechnologyExpanded && (
                <div className="roadmap-topics">
                  {technology.topics.map((topic) => {
                    const topicKey = `${technology.technology}-${topic.name}`;
                    const isTopicExpanded =
                      expandedTopic === topicKey;

                    return (
                      <div
                        className="roadmap-topic"
                        key={topic.name}
                      >
                        <button
                          type="button"
                          className="topic-button"
                          onClick={() =>
                            toggleTopic(
                              technology.technology,
                              topic.name
                            )
                          }
                        >
                          <span>{topic.name}</span>
                          <span>
                            {isTopicExpanded ? "−" : "+"}
                          </span>
                        </button>

                        {isTopicExpanded && (
                          <div className="roadmap-tasks">
                            {topic.tasks.map((task, index) => {
                              const taskData =
                                progress[technology.technology]?.[
                                  topic.name
                                ]?.[index];

                              return (
                                <div
                                  className="roadmap-task"
                                  key={index}
                                >
                                  <div className="task-content">
                                    <span className="task-number">
                                      Day {index + 1}
                                    </span>

                                    <span>{task}</span>
                                  </div>

                                  <select
                                    value={
                                      taskData?.status ||
                                      "not-started"
                                    }
                                    onChange={(event) =>
                                      handleTaskStatusChange(
                                        technology.technology,
                                        topic.name,
                                        index,
                                        event.target.value
                                      )
                                    }
                                  >
                                    <option value="not-started">
                                      Not Started
                                    </option>
                                    <option value="in-progress">
                                      In Progress
                                    </option>
                                    <option value="completed">
                                      Completed
                                    </option>
                                  </select>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Roadmap;