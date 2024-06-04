"use client";

import Link from "next/link";
import CircleProgressBar from "./CircleProgressBar";
import ProgressBar from "./ProgressBar";

import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

export default function Result({ poste, path, currentQuery }) {
  const [percentage, setPercentage] = useState(75);
  return (
    <>
      <div className="flex gap-8 flex-col">
        <div className="relative flex justify-between items-center">
          <Link
            href={{
              pathname: path,
              query: {
                path: currentQuery.path,
                poste: currentQuery.poste,
              },
            }}
          >
            <i className="w-24 text-[var(--primary-color)] cursor-pointer opacity-80 hover:opacity-100 transition-opacity duration-100">
              <FaArrowLeft size={"1.5rem"} />
            </i>
          </Link>
          <h1 className="relative w-max flex items-center justify-center text-4xl uppercase text-center font-semibold text-[var(--primary-color)] py-4">
            {poste.titre}
            <span className="absolute h-1 w-10 bg-[var(--primary-color)] rounded-full bottom-0"></span>
          </h1>
          <i></i>
        </div>{" "}
        <div className="flex flex-col gap-14">
          <h2 className="font-semibold text-slate-500 py-2 flex border-b border-slate-500">{`< General >`}</h2>
          <div className="flex flex-col gap-4 w-full">
            <ProgressBar width={90} />
          </div>
        </div>
        <div className="flex flex-col gap-6">
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
