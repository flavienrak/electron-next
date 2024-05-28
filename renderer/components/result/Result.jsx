"use client";

import Top from "../Top";
import CircleProgressBar from "./CircleProgressBar";
import ProgressBar from "./ProgressBar";

import { useState } from "react";

export default function Result() {
  const [percentage, setPercentage] = useState(50);
  return (
    <>
      <div className="w-full h-full bg-white flex flex-col">
        <Top label={"Resultat"} />
        <div className="flex gap-8 flex-col">
          <div className="flex gap-4 flex-col">
            <h1 className="font-semibold text-4xl uppercase">
              Devloppeur full stack js
            </h1>
            <div className="flex justify-center items-center flex-col gap-4 w-full">
              <label className="flex font-semibold text-2xl w-full">
                Compatibilite
              </label>
              <ProgressBar width={50} />
            </div>
          </div>
          <h2 className="font-semibold text-slate-500 py-2 flex border-b border-slate-500">{`< Details >`}</h2>
          <div className={`relative flex justify-between`}>
            <div className="flex items-center flex-col gap-4">
              <label className="font-semibold text-2xl">Competences</label>
              <CircleProgressBar percentage={percentage} circleWidth={"200"} />
            </div>
            <div className="flex items-center flex-col gap-4">
              <label className="font-semibold text-2xl">Diplomes</label>
              <CircleProgressBar percentage={percentage} circleWidth={"200"} />
            </div>
            <div className="flex items-center flex-col gap-4">
              <label className="font-semibold text-2xl">Experiences</label>
              <CircleProgressBar percentage={percentage} circleWidth={"200"} />
            </div>
            <div className="flex items-center flex-col gap-4">
              <label className="font-semibold text-2xl">Qualites</label>
              <CircleProgressBar percentage={percentage} circleWidth={"200"} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
