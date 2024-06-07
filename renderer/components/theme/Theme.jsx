"use client";

import Top from "../Top";

import { useDispatch, useSelector } from "react-redux";
import { updatePersistInfos } from "../../redux/slices/persistSlice";

export default function Theme() {
  const { theme, mode } = useSelector((state) => state.persistInfos);
  const dispatch = useDispatch();
  console.log(mode);
  return (
    <>
      <div className="w-full h-full flex flex-col rounded-md gap-4">
        <Top label={"Theme"} />
        <div className="bg-[var(--bg-1)] p-8 rounded-md h-full overflow-auto flex flex-col gap-8 scr">
          <div className="flex flex-col w-full gap-6">
            <h1 className="text-4xl text-[var(--primary-color)] uppercase">
              Choisir un mode
            </h1>
            <div className="flex justify-between rounded-md w-full gap-8">
              <label
                onClick={() => dispatch(updatePersistInfos({ mode: "light" }))}
                className={`flex items-center gap-4 bg-[var(--white)] p-4 w-1/2 shadow-sm border-slate-200 rounded-md ${
                  mode === "light" ? "border-4" : "cursor-poinnter"
                }`}
              >
                <span
                  className={`flex justify-center items-center min-h-10 min-w-10 bg-white border-slate-200 rounded-full border-4`}
                ></span>
                <span className="text-2xl">Clair</span>
              </label>
              <label
                onClick={() => dispatch(updatePersistInfos({ mode: "dark" }))}
                className={`flex items-center gap-4 bg-[var(--dark)] p-4 w-1/2 shadow-sm border-slate-200 rounded-md ${
                  mode === "dark" ? "border-4" : "cursor-poinnter"
                }`}
              >
                <span
                  className={`flex justify-center items-center min-h-10 min-w-10 bg-[var(--dark)] border-slate-200 rounded-full border-4`}
                ></span>
                <span className="text-2xl text-white">Sombre</span>
              </label>
            </div>
          </div>
          <div className="flex flex-col w-full gap-6">
            <h1 className="text-4xl text-[var(--primary-color)] uppercase">
              Choisir un theme
            </h1>
            <div className="flex justify-between bg-[var(--bg)] p-8 rounded-md shadow-sm w-full">
              <label htmlFor="">
                <span
                  onClick={() =>
                    dispatch(updatePersistInfos({ theme: "purple" }))
                  }
                  className={`flex justify-center items-center min-h-20 min-w-20 bg-[var(--purple-theme)] rounded-full border-slate-200 ${
                    theme === "purple" ? "border-8" : "cursor-pointer"
                  }`}
                ></span>
              </label>
              <label htmlFor="">
                <span
                  onClick={() =>
                    dispatch(updatePersistInfos({ theme: "yellow" }))
                  }
                  className={`flex justify-center items-center min-h-20 min-w-20 bg-[var(--yellow-theme)] rounded-full border-slate-200 ${
                    theme === "yellow" ? "border-8" : "cursor-pointer"
                  }`}
                ></span>
              </label>
              <label htmlFor="">
                <span
                  onClick={() => dispatch(updatePersistInfos({ theme: "red" }))}
                  className={`flex justify-center items-center min-h-20 min-w-20 bg-[var(--red-theme)] rounded-full border-slate-200 ${
                    theme === "red" ? "border-8" : "cursor-pointer"
                  }`}
                ></span>
              </label>
              <label htmlFor="">
                <span
                  onClick={() =>
                    dispatch(updatePersistInfos({ theme: "green" }))
                  }
                  className={`flex justify-center items-center min-h-20 min-w-20 bg-[var(--green-theme)] rounded-full border-slate-200 ${
                    theme === "green" ? "border-8" : "cursor-pointer"
                  }`}
                ></span>
              </label>
              <label htmlFor="">
                <span
                  onClick={() =>
                    dispatch(updatePersistInfos({ theme: "blue" }))
                  }
                  className={`flex justify-center items-center min-h-20 min-w-20 bg-[var(--blue-theme)] rounded-full border-slate-200 ${
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
