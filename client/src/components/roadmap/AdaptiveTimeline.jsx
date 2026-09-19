import { useMemo } from "react";
import { getAdaptiveTimeline } from "../../data/roadmap";

function AdaptiveTimeline({ progress }) {
  const timeline = useMemo(
    () => getAdaptiveTimeline(progress),
    [progress]
  );

  return (
    <section className="adaptive-timeline">
      <h2>Adaptive Learning Timeline</h2>

      <div className="timeline-summary">
        <div>
          <span>Original Timeline</span>
          <strong>{timeline.originalDays} days</strong>
        </div>

        <div>
          <span>Additional Time</span>
          <strong>{timeline.extraDays} days</strong>
        </div>

        <div>
          <span>Updated Timeline</span>
          <strong>{timeline.totalDays} days</strong>
        </div>
      </div>

      {timeline.extraDays > 0 ? (
        <p>
          Your timeline has been extended based on incomplete tasks.
        </p>
      ) : (
        <p>
          You are currently on track with your learning timeline.
        </p>
      )}
    </section>
  );
}

export default AdaptiveTimeline;