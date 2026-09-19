import { useMemo, useState } from "react";
import { getPersonalizedRoadmap } from "../../data/roadmap";

function Roadmap({ skillLevels = {} }) {
  const roadmap = useMemo(
    () => getPersonalizedRoadmap(skillLevels),
    [skillLevels]
  );

  const [expandedTechnology, setExpandedTechnology] = useState(null);
  const [expandedTopic, setExpandedTopic] = useState(null);

  const toggleTechnology = (technology) => {
    setExpandedTechnology((current) =>
      current === technology ? null : technology
    );
  };

  const toggleTopic = (technology, topic) => {
    const key = `${technology}-${topic}`;

    setExpandedTopic((current) => (current === key ? null : key));
  };

  return (
    <section className="roadmap">
      <div className="roadmap-header">
        <h1>Personalized Web Development Roadmap</h1>
        <p>
          Follow your roadmap from the technologies you need to learn to the
          individual daily tasks.
        </p>
      </div>

      <div className="roadmap-list">
        {roadmap.map((technology) => {
          const isTechnologyExpanded =
            expandedTechnology === technology.technology;

          return (
            <div className="roadmap-technology" key={technology.technology}>
              <button
                type="button"
                className="technology-button"
                onClick={() => toggleTechnology(technology.technology)}
              >
                <span>{technology.technology}</span>
                <span>{isTechnologyExpanded ? "−" : "+"}</span>
              </button>

              {isTechnologyExpanded && (
                <div className="roadmap-topics">
                  {technology.topics.length === 0 ? (
                    <p>No topics available for this level.</p>
                  ) : (
                    technology.topics.map((topic) => {
                      const topicKey = `${technology.technology}-${topic.name}`;
                      const isTopicExpanded = expandedTopic === topicKey;

                      return (
                        <div className="roadmap-topic" key={topic.name}>
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
                            <span>{isTopicExpanded ? "−" : "+"}</span>
                          </button>

                          {isTopicExpanded && (
                            <div className="roadmap-tasks">
                              {topic.tasks.map((task, index) => (
                                <div className="roadmap-task" key={index}>
                                  <span className="task-number">
                                    Day {index + 1}
                                  </span>
                                  <span>{task}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
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