"use client";

import { useEffect, useState } from "react";
import { getColor } from "../../lib/allFunctions";

export default function ProgressBar({ width }) {
  const bg = getColor(width);
  const [actualWidth, setActualWidth] = useState(0);

  useEffect(() => {
    const steps = Math.max(Math.round(1000 / width), 1);

    const intervalId = setInterval(() => {
      const increment = 1;
      if (actualWidth < width) {
        setActualWidth((prevWidth) => Math.min(prevWidth + increment, width));
      } else {
        clearInterval(intervalId);
      }
    }, steps);

    return () => clearInterval(intervalId);
  }, [width]);

  return (
    <div className="w-full bg-slate-200 rounded-full">
      <div
        style={{
          width: `${actualWidth}%`,
          transition: "width 1s",
          background: `${bg}`,
        }}
        className="relative rounded-full h-[15px]"
      >
        <span
          style={{
            background: `${bg}`,
          }}
          className={`absolute right-0 px-2 py-1 text-white rounded-md text-sm -translate-y-10 translate-x-4`}
        >
          <span
            style={{
              background: `${bg}`,
            }}
            className={`absolute h-3 w-3 rotate-45 translate-y-4 translate-x-2 rounded-sm`}
          ></span>
          {actualWidth}%
        </span>
      </div>
    </div>
  );
}
