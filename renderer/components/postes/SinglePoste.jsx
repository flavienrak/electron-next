"use client";

import Top from "../Top";

import { HiPhone } from "react-icons/hi2";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";

export default function SinglePoste() {
  return (
    <>
      <div className="w-full h-full bg-white flex flex-col">
        <Top label={"Poste"} />
        <div className="flex gap-8 flex-col">
          <h1 className="text-4xl uppercase text-center font-semibold">
            Developpeur Full Stack JS
          </h1>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <div className="w-1/3 flex flex-col gap-2">
                <label className="flex items-center gap-2">
                  <i>
                    <HiPhone size={"1rem"} />
                  </i>
                  <span>+261 32 72 263 85</span>
                </label>
                <label className="flex items-center gap-2">
                  <i>
                    <MdEmail size={"1.2rem"} />
                  </i>
                  <span>flavien.andrisoarak@gmail.com</span>
                </label>
                <label className="flex items-center gap-2">
                  <i>
                    <FaLocationDot size={"1.2rem"} />
                  </i>
                  <span>Soatsihadino Fianarantsoa</span>
                </label>
              </div>

              <div className="w-1/3">
                <div className="relative flex justify-center items-center min-h-36 min-w-36 w-36 rounded-full bg-slate-200">
                  <span className="text-6xl">M</span>
                </div>
              </div>

              <div className="w-1/3">
                <label className="flex items-center gap-2 text-4xl">
                  RAKOTONDRABE
                </label>
                <label className="flex items-center gap-2 text-2xl pb-2">
                  Andrisoa Flavien
                </label>
                <label className="flex items-center gap-2 border-l border-slate-900 px-2 h-10 bg-slate-200">
                  Stagiaire
                </label>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="description" className="font-semibold">
                  Description du projet
                </label>
                <textarea
                  rows={4}
                  type="text"
                  id="description"
                  className="bg-slate-200 py-1 px-2 focus:outline-1 focus:outline-slate-300 outline-offset-2"
                />
              </div>
              <div></div>
              <div className="flex flex-col gap-2">
                <label htmlFor="responsabilites" className="font-semibold">
                  Responsabilites
                </label>
                <input
                  type="text"
                  id="responsabilites"
                  className="bg-slate-200 py-1 px-2 focus:outline-1 focus:outline-slate-300 outline-offset-2 h-10"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="competences" className="font-semibold">
                  Competences requises
                </label>
                <input
                  type="text"
                  id="competences"
                  className="bg-slate-200 py-1 px-2 focus:outline-1 focus:outline-slate-300 outline-offset-2 h-10"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="diplomes" className="font-semibold">
                  Diplomes requis
                </label>
                <input
                  type="text"
                  id="diplomes"
                  className="bg-slate-200 py-1 px-2 focus:outline-1 focus:outline-slate-300 outline-offset-2 h-10"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="qualites" className="font-semibold">
                  Qualites humaines
                </label>
                <input
                  type="text"
                  id="qualites"
                  className="bg-slate-200 py-1 px-2 focus:outline-1 focus:outline-slate-300 outline-offset-2 h-10"
                />
              </div>
            </div>

            <div className="py-2 pr-4">
              <button className="bg-blue-500 text-white h-10 w-1/2 rounded-sm">
                <span>Evaluer le poste</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
