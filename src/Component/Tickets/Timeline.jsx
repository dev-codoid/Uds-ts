import React, { useState } from "react";
import HorizontalTimeline from "react-horizontal-timeline";

const Timeline = () => {
  const [current, setCurrent] = useState(0);
  const VALUES = ["2021-01", "2021-06", "2022-01"];
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (callback) => setTimeout(callback, 1000 / 60);
  }
  
  return (
    <div>
      <HorizontalTimeline
        values={VALUES}
        index={current}
        indexClick={(index) => setCurrent(index)}
      />
      <p>Selected: {VALUES[current]}</p>
    </div>
  );
};

export default Timeline;
