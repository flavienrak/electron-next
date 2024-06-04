"use client";

import Link from "next/link";
import Top from "../Top";

import { FaCaretRight } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";

export default function Accueil() {
  return (
    <>
      <div className="w-full h-full bg-white flex flex-col">
        <Top label={"Accueil"} />
        <div className="flex-1 bg-slate-100 p-8 rounded-md h-full overflow-auto flex items-center justify-center">
          <div className="flex flex-col justify-between h-full">
            <div className="flex flex-col gap-10 py-10">
              <h1 className="flex flex-col justify-center text-center gap-2">
                <span className="text-6xl text-slate-800">
                  Decouvrir la puissance de
                </span>
                <span className="text-6xl bgText">l'IA.</span>
              </h1>
              <p className="px-24 text-center text-slate-600">
                Completer les informations de votre profil. <br /> Ajouter,
                editer et evaluer les postes en utilisant le model
                d'intelligence artificielle integre a l'application.
              </p>
              <div className="flex justify-center">
                <Link
                  href={{
                    pathname: "/home",
                    query: {
                      path: "profil",
                    },
                  }}
                  className="flex justify-center items-center bgGradient w-max h-12 rounded-full gap-2 px-6 font-semibold text-white"
                >
                  <span>Commencer</span>
                  <i>
                    <FaCaretRight size={"1.5rem"} />
                  </i>
                </Link>
              </div>
            </div>
            <div className="flex gap-4 justify-center border-t border-b border-slate-300 bg-slate-200 py-4">
              <div className="w-1/2 flex justify-center items-center">
                <label className="font-bold">Compatibilite generale</label>
              </div>
              <div className="w-1/2 flex justify-center items-center">
                <label className="font-bold">Details du resultat</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
