"use client";

import {
  MdAssuredWorkload,
  MdEmail,
  MdOutlineAssuredWorkload,
  MdOutlineInterests,
  MdOutlineSensorOccupied,
  MdOutlineWorkOutline,
} from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { GoLocation } from "react-icons/go";
import { GrLanguage, GrUserExpert } from "react-icons/gr";
import { IoCamera } from "react-icons/io5";
import { AiOutlineUser } from "react-icons/ai";

export default function EditProfil({ setIsEditProfil }) {
  return (
    <>
      <form className="flex gap-4 flex-col">
        <div className="flex justify-between w-full items-center gap-10">
          <div className="w-1/3 flex justify-center items-center">
            <div className="relative flex justify-center items-center min-h-36 min-w-36 w-36 rounded-full bg-slate-200">
              <span className="text-6xl">M</span>
              <label
                htmlFor="file"
                className="absolute bottom-1 right-1 min-w-8 min-h-8 flex justify-center items-center bg-white rounded-full cursor-pointer"
              >
                <IoCamera size={"1.5rem"} />
              </label>
              <input id="file" type="file" className="hidden" />
            </div>
          </div>
          <div className="w-1/3 flex flex-col gap-2">
            <div className="w-full gap-2 flex flex-col">
              <label
                htmlFor="nom"
                className="font-semibold flex gap-2 items-center"
              >
                <i>
                  <AiOutlineUser size={"1rem"} />
                </i>
                Nom
              </label>
              <input
                id="nom"
                className="flex items-center bg-slate-200 h-10 px-4 rounded-sm focus:outline-slate-300 focus:outline-offset-2"
              />
            </div>
            <div className="w-full gap-2 flex flex-col">
              <label
                htmlFor="prenom"
                className="font-semibold flex gap-2 items-center"
              >
                <i>
                  <AiOutlineUser size={"1rem"} />
                </i>
                Prenom
              </label>
              <input
                id="prenom"
                className="flex items-center bg-slate-200 h-10 px-4 rounded-sm focus:outline-slate-300 focus:outline-offset-2"
              />
            </div>
            <div className="w-full gap-2 flex flex-col">
              <label
                htmlFor="poste"
                className="font-semibold flex gap-2 items-center"
              >
                <i>
                  <MdAssuredWorkload size={"1rem"} />
                </i>
                Poste
              </label>
              <input
                id="poste"
                className="flex items-center bg-slate-200 h-10 px-4 rounded-sm focus:outline-slate-300 focus:outline-offset-2"
              />
            </div>
          </div>
          <div className="w-1/3 flex flex-col gap-2">
            <div className="w-full gap-2 flex flex-col">
              <label
                htmlFor="email"
                className="font-semibold flex gap-2 items-center"
              >
                <i>
                  <MdOutlineWorkOutline size={"1rem"} />
                </i>
                Email
              </label>
              <input
                id="email"
                className="flex items-center bg-slate-200 h-10 px-4 rounded-sm focus:outline-slate-300 focus:outline-offset-2"
              />
            </div>
            <div className="w-full gap-2 flex flex-col">
              <label
                htmlFor="telephone"
                className="font-semibold flex gap-2 items-center"
              >
                <i>
                  <MdOutlineWorkOutline size={"1rem"} />
                </i>
                Telephone
              </label>
              <input
                id="telephone"
                className="flex items-center bg-slate-200 h-10 px-4 rounded-sm focus:outline-slate-300 focus:outline-offset-2"
              />
            </div>
            <div className="w-full gap-2 flex flex-col">
              <label
                htmlFor="adresse"
                className="font-semibold flex gap-2 items-center"
              >
                <i>
                  <GoLocation size={"1rem"} />
                </i>
                Adresse
              </label>
              <input
                id="adresse"
                className="flex items-center bg-slate-200 h-10 px-4 rounded-sm focus:outline-slate-300 focus:outline-offset-2"
              />
            </div>
          </div>
        </div>
        <div className="w-full grid grid-cols-2 gap-x-10 gap-y-4">
          <div className="w-full gap-2 flex flex-col">
            <label
              htmlFor="role"
              className="font-semibold flex gap-2 items-center"
            >
              <i>
                <MdOutlineSensorOccupied size={"1rem"} />
              </i>
              Role
            </label>
            <input
              id="role"
              className="flex items-center bg-slate-200 h-10 px-4 rounded-sm focus:outline-slate-300 focus:outline-offset-2"
            />
          </div>

          <div className="w-full gap-2 flex flex-col">
            <label
              htmlFor="competence"
              className="font-semibold flex gap-2 items-center"
            >
              <i>
                <MdOutlineWorkOutline size={"1rem"} />
              </i>
              Competences
            </label>
            <input
              id="competence"
              className="flex items-center bg-slate-200 h-10 px-4 rounded-sm focus:outline-slate-300 focus:outline-offset-2"
            />
          </div>
          <div className="w-full gap-2 flex flex-col">
            <label
              htmlFor="experience"
              className="font-semibold flex gap-2 items-center"
            >
              <i>
                <GrUserExpert size={"1rem"} />
              </i>
              Experiences
            </label>
            <input
              id="experience"
              className="flex items-center bg-slate-200 h-10 px-4 rounded-sm focus:outline-slate-300 focus:outline-offset-2"
            />
          </div>
          <div className="w-full gap-2 flex flex-col">
            <label
              htmlFor="formation"
              className="font-semibold flex gap-2 items-center"
            >
              <i>
                <MdOutlineAssuredWorkload size={"1rem"} />
              </i>
              Formations
            </label>
            <input
              id="formation"
              className="flex items-center bg-slate-200 h-10 px-4 rounded-sm focus:outline-slate-300 focus:outline-offset-2"
            />
          </div>
          <div className="w-full gap-2 flex flex-col">
            <label
              htmlFor="langue"
              className="font-semibold flex gap-2 items-center"
            >
              <i>
                <GrLanguage size={"1rem"} />
              </i>
              Langues
            </label>
            <input
              id="langue"
              className="flex items-center bg-slate-200 h-10 px-4 rounded-sm focus:outline-slate-300 focus:outline-offset-2"
            />
          </div>
          <div className="w-full gap-2 flex flex-col">
            <label
              htmlFor="ci"
              className="font-semibold flex gap-2 items-center"
            >
              <i>
                <MdOutlineInterests size={"1.25rem"} />
              </i>
              Centre d'interet
            </label>
            <input
              id="ci"
              className="flex items-center bg-slate-200 h-10 px-4 rounded-sm focus:outline-slate-300 focus:outline-offset-2"
            />
          </div>
          <div className="py-2 flex gap-4 w-full">
            <button
              type="reset"
              onClick={() => setIsEditProfil(false)}
              className="bg-red-500 text-white h-10 rounded-sm w-full"
            >
              <span>Annuler</span>
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white h-10 rounded-sm w-full"
            >
              <span>Mettre a jour</span>
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
