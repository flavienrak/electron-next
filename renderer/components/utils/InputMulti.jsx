"use client";

import { isEmpty } from "../../lib/allFunctions";

import { FiPlus } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import { PiStudent } from "react-icons/pi";

export default function InputMulti({
  id,
  value,
  label,
  placeholder,
  icon,
  array,
  onChange,
  onEnter,
  onAdd,
  onDelete,
}) {
  return (
    <div className="w-full gap-2 flex flex-col justify-between">
      <label
        htmlFor={id}
        className="font-semibold flex gap-2 items-center text-[var(--cont)]"
      >
        <i>{icon}</i>
        {label}
      </label>
      {!isEmpty(array) && (
        <div className="flex gap-2 flex-wrap">
          {array.map((item, index) => (
            <p
              key={item}
              className="bg-[var(--bg)] py-1 pl-4 pr-2 rounded-full flex items-center gap-2"
            >
              <span className="text-xs text-[var(--cont)]">{item}</span>
              <i
                onClick={() => onDelete(index)}
                className="text-[var(--cont)] cursor-pointer"
              >
                <IoCloseOutline size={"1rem"} />
              </i>
            </p>
          ))}
        </div>
      )}
      <div className="w-full flex justify-between gap-2 items-center">
        <input
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyDown={onEnter}
          className="flex items-center bg-[var(--bg)] h-10 px-4 rounded-sm focus:outline-slate-300 focus:outline-offset-2 flex-1 text-[var(--cont)]"
        />
        <i
          onClick={onAdd}
          className="flex justify-center items-center bg-[var(--bg)] h-10 px-2 rounded-sm cursor-pointer text-[var(--cont)]"
        >
          <FiPlus size={"1rem"} />
        </i>
      </div>
    </div>
  );
}
