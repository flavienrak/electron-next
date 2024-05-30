import { getColor } from "../../lib/allFunctions";

export default function CircleProgressBar({ percentage, circleWidth }) {
  const radius = 85;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * percentage) / 100;
  const color = getColor(percentage);

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
        className="circle-background fill-none stroke-[#ddd]"
      />
      <circle
        cx={circleWidth / 2}
        cy={circleWidth / 2}
        strokeWidth={"15px"}
        r={radius}
        style={{ strokeDasharray: dashArray, strokeDashoffset: dashOffset }}
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
        {percentage}%
      </text>
    </svg>
  );
}
