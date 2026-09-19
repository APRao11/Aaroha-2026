import "./Roadmap.css";
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

  const totalTasks = Object.values(progress).reduce(
    (technologyTotal, technology) =>
      technologyTotal +
      Object.values(technology).reduce(
        (topicTotal, topic) => topicTotal + Object.keys(topic).length,
        0
      ),
    0
  );

  const completedTasks = Object.values(progress).reduce(
    (technologyTotal, technology) =>
      technologyTotal +
      Object.values(technology).reduce(
        (topicTotal, topic) =>
          topicTotal +
          Object.values(topic).filter(
            (task) => task.status === "completed"
          ).length,
        0
      ),
    0
  );

  const toggleTechnology = (technology) => {
    setExpandedTechnology((current) =>
      current === technology ? null : technology
    );

    setExpandedTopic(null);
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

  const getTechnologyProgress = (technologyName) => {
    const technologyProgress = progress[technologyName];

    if (!technologyProgress) return 0;

    let total = 0;
    let completed = 0;

    Object.values(technologyProgress).forEach((topic) => {
      Object.values(topic).forEach((task) => {
        total++;

        if (task.status === "completed") {
          completed++;
        }
      });
    });

    return total === 0
      ? 0
      : Math.round((completed / total) * 100);
  };

  const getStatusLabel = (status) => {
    if (status === "completed") return "Completed";
    if (status === "in-progress") return "In Progress";
    return "Not Started";
  };

  const getStatusClass = (status) => {
    if (status === "completed") return "completed";
    if (status === "in-progress") return "in-progress";
    return "not-started";
  };

  return (
    <section className="roadmap-page">
      <div className="roadmap-container">

        {/* Header */}
        <header className="roadmap-hero">
          <div className="roadmap-hero-content">
            <div className="roadmap-badge">
              Personalized Learning Path
            </div>

            <h1>Your Web Development Roadmap</h1>

            <p>
              A personalized path from fundamentals to building
              real-world React applications.
            </p>
          </div>

          <div className="roadmap-progress-card">
            <div className="progress-ring">
              <span>{overallProgress}%</span>
            </div>

            <div>
              <span className="progress-label">
                Overall Progress
              </span>

              <strong>
                {completedTasks} / {totalTasks} tasks completed
              </strong>
            </div>
          </div>
        </header>

        {/* Progress bar */}
        <div className="overall-progress">
          <div className="overall-progress-top">
            <span>Learning Progress</span>
            <strong>{overallProgress}%</strong>
          </div>

          <div className="overall-progress-track">
            <div
              className="overall-progress-fill"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>

        {/* Roadmap */}
        <div className="roadmap-path">

          {roadmap.map((technology, technologyIndex) => {
            const technologyProgress =
              getTechnologyProgress(technology.technology);

            const isTechnologyExpanded =
              expandedTechnology === technology.technology;

            return (
              <div
                className="roadmap-node"
                key={technology.technology}
              >

                {/* Connector */}
                {technologyIndex !== 0 && (
                  <div className="roadmap-connector" />
                )}

                {/* Technology card */}
                <div
                  className={`technology-card ${
                    isTechnologyExpanded ? "expanded" : ""
                  }`}
                >
                  <button
                    type="button"
                    className="technology-header"
                    onClick={() =>
                      toggleTechnology(technology.technology)
                    }
                  >
                    <div className="technology-left">
                      <div className="technology-number">
                        {String(technologyIndex + 1).padStart(2, "0")}
                      </div>

                      <div>
                        <h2>{technology.technology}</h2>

                        <span>
                        {technology.level} • {technology.topics.length} topics
                        {" • "}
                         {technologyProgress}% complete
                        </span>
                      </div>
                    </div>

                    <div className="technology-right">
                      <div className="mini-progress">
                        <div
                          className="mini-progress-fill"
                          style={{
                            width: `${technologyProgress}%`,
                          }}
                        />
                      </div>

                      <span className="expand-icon">
                        {isTechnologyExpanded ? "−" : "+"}
                      </span>
                    </div>
                  </button>

                  {/* Topics */}
                  {isTechnologyExpanded && (
                    <div className="technology-content">

                      {technology.topics.map((topic, topicIndex) => {
                        const topicKey =
                          `${technology.technology}-${topic.name}`;

                        const isTopicExpanded =
                          expandedTopic === topicKey;

                        return (
                          <div
                            className={`topic-card ${
                              isTopicExpanded ? "expanded" : ""
                            }`}
                            key={topic.name}
                          >

                            <button
                              type="button"
                              className="topic-header"
                              onClick={() =>
                                toggleTopic(
                                  technology.technology,
                                  topic.name
                                )
                              }
                            >
                              <div className="topic-left">
                                <span className="topic-number">
                                  {topicIndex + 1}
                                </span>

                                <div>
                                  <h3>{topic.name}</h3>

                                  <span>
                                    {topic.tasks.length} learning tasks
                                  </span>
                                </div>
                              </div>

                              <span className="topic-arrow">
                                {isTopicExpanded ? "⌃" : "⌄"}
                              </span>
                            </button>

                            {/* Tasks */}
                            {isTopicExpanded && (
                              <div className="task-list">

                                {topic.tasks.map(
                                  (task, taskIndex) => {
                                    const taskData =
                                      progress[
                                        technology.technology
                                      ]?.[topic.name]?.[taskIndex];

                                    const status =
                                      taskData?.status ||
                                      "not-started";

                                    return (
                                      <div
                                        className={`task-card ${getStatusClass(
                                          status
                                        )}`}
                                        key={taskIndex}
                                      >
                                        <div className="task-main">
                                          <div className="task-number">
                                            {String(
                                              taskIndex + 1
                                            ).padStart(2, "0")}
                                          </div>

                                          <div className="task-details">
                                            <span className="task-label">
                                              DAY {taskIndex + 1}
                                            </span>

                                            <p>{task}</p>
                                          </div>
                                        </div>

                                        <select
                                          className={`task-status ${getStatusClass(
                                            status
                                          )}`}
                                          value={status}
                                          onChange={(event) =>
                                            handleTaskStatusChange(
                                              technology.technology,
                                              topic.name,
                                              taskIndex,
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

                                        <span className="status-text">
                                          {getStatusLabel(status)}
                                        </span>
                                      </div>
                                    );
                                  }
                                )}

                              </div>
                            )}

                          </div>
                        );
                      })}

                    </div>
                  )}

                </div>
              </div>
            );
          })}

        </div>

        {/* Bottom message */}
        <div className="roadmap-footer">
          <div className="footer-icon">✓</div>

          <div>
            <strong>Keep progressing</strong>

            <p>
              Complete your tasks to track your progress and
              keep your learning timeline up to date.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Roadmap;