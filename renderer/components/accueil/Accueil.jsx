"use client";

import Top from "../Top";

import { FaCaretRight } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";

export default function Accueil() {
  return (
    <>
      <div className="w-full h-full bg-white flex flex-col">
        <Top label={"Bienvenue"} />
        <div className="flex gap-4 flex-1 justify-between items-center">
          <div className="w-1/2 grid grid-cols-2">
            <div className="bg-slate-400 h-40 w-full p-4 flex flex-col justify-between">
              <h1>Titre du poste</h1>
              <div>
                <label htmlFor="" className="line-clamp-2 leading-4 text-xs">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Similique omnis hic quisquam blanditiis repellat ipsam,
                  nostrum dolor consequuntur accusamus iusto voluptas! Quos illo
                  totam sed nobis obcaecati, numquam reiciendis magnam.
                </label>
              </div>
              <div className="flex items-center justify-end wfull">
                <button className="w-max">
                  <i className="text-slate-700">
                    <FaArrowRight size={"1rem"} />
                  </i>
                </button>
              </div>
            </div>
            <div className="bg-slate-300 h-40 w-full"></div>
            <div className="bg-slate-200 h-40 w-full"></div>
            <div className="bg-slate-100 h-40 w-full"></div>
          </div>
          <div className="w-1/2 flex flex-col gap-2">
            <h1 className="uppercase text-3xl">Explorer</h1>
            <p className="text-lg pl-1">
              Suggestions des postes qui correspond a votre profil selon le
              model d'Intelligence Artificielle.
            </p>
            <button className="flex gap-2 items-center bg-slate-200 rounded-full px-4 py-2 w-max">
              <span>Commencer</span>
              <i className="text-slate-600">
                <FaCaretRight size={"1.25rem"} />
              </i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
