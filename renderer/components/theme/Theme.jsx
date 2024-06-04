"use client";

import Top from "../Top";

import { useDispatch, useSelector } from "react-redux";
import { updatePersistInfos } from "../../redux/slices/persistSlice";

export default function Theme() {
  const { theme } = useSelector((state) => state.persistInfos);
  const dispatch = useDispatch();
  return (
    <>
      <div className="w-full h-full bg-white flex flex-col">
        <Top label={"Theme"} />
        <div className="flex-1 bg-slate-100 p-8 rounded-md h-full overflow-auto flex items-center justify-center">
          <div className="flex flex-col h-full w-full gap-6">
            <h1 className="text-4xl text-[var(--primary-color)] uppercase">
              Choisir un theme
            </h1>
            <div className="flex justify-between bg-white p-8 rounded-md shadow-sm w-full">
              <label htmlFor="">
                <span
                  onClick={() =>
                    dispatch(updatePersistInfos({ theme: "purple" }))
                  }
                  className={`flex justify-center items-center min-h-24 min-w-24 bg-[var(--purple-theme)] rounded-full border-slate-200 ${
                    theme === "purple" ? "border-8" : "cursor-pointer"
                  }`}
                ></span>
              </label>
              <label htmlFor="">
                <span
                  onClick={() =>
                    dispatch(updatePersistInfos({ theme: "yellow" }))
                  }
                  className={`flex justify-center items-center min-h-24 min-w-24 bg-[var(--yellow-theme)] rounded-full border-slate-200 ${
                    theme === "yellow" ? "border-8" : "cursor-pointer"
                  }`}
                ></span>
              </label>
              <label htmlFor="">
                <span
                  onClick={() => dispatch(updatePersistInfos({ theme: "red" }))}
                  className={`flex justify-center items-center min-h-24 min-w-24 bg-[var(--red-theme)] rounded-full border-slate-200 ${
                    theme === "red" ? "border-8" : "cursor-pointer"
                  }`}
                ></span>
              </label>
              <label htmlFor="">
                <span
                  onClick={() =>
                    dispatch(updatePersistInfos({ theme: "green" }))
                  }
                  className={`flex justify-center items-center min-h-24 min-w-24 bg-[var(--green-theme)] rounded-full border-slate-200 ${
                    theme === "green" ? "border-8" : "cursor-pointer"
                  }`}
                ></span>
              </label>
              <label htmlFor="">
                <span
                  onClick={() =>
                    dispatch(updatePersistInfos({ theme: "blue" }))
                  }
                  className={`flex justify-center items-center min-h-24 min-w-24 bg-[var(--blue-theme)] rounded-full border-slate-200 ${
                    theme === "blue" ? "border-8" : "cursor-pointer"
                  }`}
                ></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
