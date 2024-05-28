"use client";

import Top from "../Top";

export default function Nouveau() {
  return (
    <>
      <div className="w-full h-full bg-white flex flex-col">
        <Top label={"Nouveau"} />

        <div className="flex gap-4 flex-1 flex-col">
          <div className="flex flex-col gap-2 w-1/2">
            <label htmlFor="title" className="font-semibold">
              Titre du poste
            </label>
            <input
              type="text"
              id="title"
              className="bg-slate-200 py-1 px-2 focus:outline-1 focus:outline-slate-300 outline-offset-2 h-10"
            />
          </div>
          <div className="flex flex-col gap-2 w-1/2">
            <label htmlFor="responsabilites" className="font-semibold">
              Responsabilites
            </label>
            <input
              type="text"
              id="responsabilites"
              className="bg-slate-200 py-1 px-2 focus:outline-1 focus:outline-slate-300 outline-offset-2 h-10"
            />
          </div>
          <div className="flex flex-col gap-2 w-1/2">
            <label htmlFor="competences" className="font-semibold">
              Competences requises
            </label>
            <input
              type="text"
              id="competences"
              className="bg-slate-200 py-1 px-2 focus:outline-1 focus:outline-slate-300 outline-offset-2 h-10"
            />
          </div>
          <div className="flex flex-col gap-2 w-1/2">
            <label htmlFor="diplomes" className="font-semibold">
              Diplomes requis
            </label>
            <input
              type="text"
              id="diplomes"
              className="bg-slate-200 py-1 px-2 focus:outline-1 focus:outline-slate-300 outline-offset-2 h-10"
            />
          </div>
          <div className="flex flex-col gap-2 w-1/2">
            <label htmlFor="qualites" className="font-semibold">
              Qualites humaines
            </label>
            <input
              type="text"
              id="qualites"
              className="bg-slate-200 py-1 px-2 focus:outline-1 focus:outline-slate-300 outline-offset-2 h-10"
            />
          </div>
          <div className="flex flex-col gap-2 w-1/2">
            <label htmlFor="description" className="font-semibold">
              Description
            </label>
            <textarea
              rows={4}
              type="text"
              id="description"
              className="bg-slate-200 py-1 px-2 focus:outline-1 focus:outline-slate-300 outline-offset-2"
            />
          </div>
          <div className="flex gap-4 justify-end w-1/2">
            <button className="bg-red-500 w-1/2 h-10 rounded-sm">
              <span className="text-white">Annuler</span>
            </button>
            <button className="bg-green-500 w-1/2 h-10 rounded-sm">
              <span className="text-white">Ajouter</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
