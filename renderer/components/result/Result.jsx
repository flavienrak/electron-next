import Link from "next/link";
import CircleProgressBar from "./CircleProgressBar";
import ProgressBar from "./ProgressBar";

import { FaArrowLeft } from "react-icons/fa";

export default function Result({ poste, path, currentQuery, actualMatch }) {
  const percentage = (value) => {
    return Math.round(value * 100);
  };

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
                view: currentQuery.poste,
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
          <h2 className="font-semibold text-[var(--cont)] py-2 flex border-b border-[var(--cont)]">{`< Compatibilite general >`}</h2>
          <div className="flex flex-col gap-4 w-full">
            <ProgressBar width={percentage(actualMatch.globalScore)} />
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <h2 className="font-semibold text-[var(--cont)] py-2 flex border-b border-[var(--cont)]">{`< Details >`}</h2>
          <div className={`relative flex justify-between`}>
            <div className="flex items-center flex-col gap-4">
              <label className="font-semibold text-2xl text-[var(--cont)]">
                Competences
              </label>
              <CircleProgressBar
                percentage={percentage(actualMatch.competences)}
                circleWidth={"200"}
              />
            </div>
            <div className="flex items-center flex-col gap-4">
              <label className="font-semibold text-2xl text-[var(--cont)]">
                Diplomes
              </label>
              <CircleProgressBar
                percentage={percentage(actualMatch.diplomes)}
                circleWidth={"200"}
              />
            </div>
            <div className="flex items-center flex-col gap-4">
              <label className="font-semibold text-2xl text-[var(--cont)]">
                Experiences
              </label>
              <CircleProgressBar
                percentage={percentage(actualMatch.experiences)}
                circleWidth={"200"}
              />
            </div>
            <div className="flex items-center flex-col gap-4">
              <label className="font-semibold text-2xl text-[var(--cont)]">
                Qualites
              </label>
              <CircleProgressBar
                percentage={percentage(actualMatch.qualites)}
                circleWidth={"200"}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
