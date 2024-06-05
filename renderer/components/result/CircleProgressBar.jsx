"use client";

import { useEffect, useState } from "react";
import { getColor } from "../../lib/allFunctions";

export default function CircleProgressBar({ percentage, circleWidth }) {
  const radius = 85;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * percentage - 1) / 100;
  const color = getColor(percentage);

  const [actualWidth, setActualWidth] = useState(0);
  const [actualOffset, setActualOffset] = useState(0);

  useEffect(() => {
    const steps = Math.max(Math.round(1000 / percentage), 1);

    const intervalId = setInterval(() => {
      const increment = 1;
      if (actualWidth < percentage) {
        setActualWidth((prevWidth) =>
          Math.min(prevWidth + increment, percentage)
        );
      } else {
        clearInterval(intervalId);
      }
    }, steps);

    const offsetStep = Math.max(Math.round(1000 / dashOffset), 1);

    const intervalStep = setInterval(() => {
      const increment = 1;
      if (actualOffset < dashOffset) {
        setActualOffset((prevWidth) =>
          Math.min(prevWidth + increment, dashOffset)
        );
      } else {
        clearInterval(intervalId);
      }
    }, offsetStep);

    return () => {
      clearInterval(intervalId);
      clearInterval(intervalStep);
    };
  }, [percentage]);

  return (
    <svg
      width={circleWidth}
      height={circleWidth}
      viewBox={`0 0 ${circleWidth} ${circleWidth}`}
    >
      <circle
        cx={circleWidth / 2}
        cy={circleWidth / 2}
        strokeWidth={"15px"}
        r={radius}
        className="circle-background fill-none stroke-[#e2e8f0]"
      />
      <circle
        cx={circleWidth / 2}
        cy={circleWidth / 2}
        strokeWidth={"15px"}
        r={radius}
        style={{
          strokeDasharray: dashArray,
          strokeDashoffset: actualOffset,
        }}
        transform={`rotate(-90 ${circleWidth / 2} ${circleWidth / 2})`}
        stroke={color}
        className={`circle-progress fill-none`}
      />
      <text
        x={"50%"}
        y={"50%"}
        dy={"0.4em"}
        textAnchor="middle"
        className="text-2xl"
        fill={color}
      >
        {actualWidth}%
      </text>
    </svg>
  );
}
