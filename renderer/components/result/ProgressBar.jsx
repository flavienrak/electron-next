"use client";

import { getColor } from "../../lib/allFunctions";

export default function ProgressBar({ width }) {
  const bg = getColor(width);
  return (
    <div className="w-full bg-slate-200 rounded-full">
      <div
        style={{
          width: `${width}%`,
          transition: "width 0.5s",
          background: `${bg}`,
        }}
        className="relative rounded-full h-4"
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
          {width}%
        </span>
      </div>
    </div>
  );
}
