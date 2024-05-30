"use client";

import Top from "../Top";
import EditProfil from "./EditProfil";

import {
  MdEmail,
  MdOutlineAssuredWorkload,
  MdOutlineInterests,
  MdOutlineWorkOutline,
  MdModeEdit,
} from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { HiPhone } from "react-icons/hi2";
import { GrLanguage, GrUserExpert } from "react-icons/gr";
import { IoCamera } from "react-icons/io5";
import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "../../lib/isEmpty";
import { UidContext } from "../../context/UidContext";

export default function Profil() {
  const { letter } = useContext(UidContext);
  const { user } = useSelector((state) => state.user);
  const [isEditProfil, setIsEditProfil] = useState(false);

  return (
    <>
      <div className="w-full h-full bg-white flex flex-col">
        <Top label={"Profil"} />
        {isEditProfil ? (
          <EditProfil setIsEditProfil={setIsEditProfil} />
        ) : (
          <div className="flex gap-4 flex-col">
            <div className="flex justify-between w-full items-center">
              <div className="w-1/3 flex flex-col gap-2">
                <label className="flex items-center gap-2">
                  <i>
                    <HiPhone size={"1rem"} />
                  </i>
                  {!isEmpty(user?.telephone) ? (
                    <span>{user.telephone}</span>
                  ) : (
                    <span className="text-slate-500 text-sm">{`< Aucun >`}</span>
                  )}
                </label>
                <label className="flex items-center gap-2">
                  <i>
                    <MdEmail size={"1.2rem"} />
                  </i>
                  <span>{user.email}</span>
                </label>
                <label className="flex items-center gap-2">
                  <i>
                    <FaLocationDot size={"1.2rem"} />
                  </i>
                  {!isEmpty(user?.adresse) ? (
                    <span>{user.adresse}</span>
                  ) : (
                    <span className="text-slate-500 text-sm">{`< Aucun >`}</span>
                  )}
                </label>
              </div>
              <div className="w-1/3">
                <div className="relative flex justify-center items-center min-h-36 min-w-36 w-36 rounded-full bg-slate-200">
                  <span className="text-6xl">{letter}</span>
                  <label
                    htmlFor="file"
                    className="absolute bottom-1 right-1 min-w-8 min-h-8 flex justify-center items-center bg-white rounded-full cursor-pointer"
                  >
                    <IoCamera size={"1.5rem"} />
                  </label>
                  <input id="file" type="file" className="hidden" />
                </div>
              </div>
              <div className="w-1/3">
                <label className="flex items-center gap-2 text-4xl uppercase">
                  {user.nom}
                </label>
                <label className="flex items-center gap-2 text-2xl pb-2 capitalize">
                  {user.prenom}
                </label>
                {!isEmpty(user?.poste) ? (
                  <label className="flex items-center gap-2 border-l border-slate-900 px-2 h-10 bg-slate-200">
                    {user.poste}
                  </label>
                ) : (
                  <label className="flex items-center gap-2 px-2 h-10 bg-slate-200 text-slate-500 text-sm">
                    {`< Aucun poste >`}
                  </label>
                )}
              </div>
            </div>
            <div className="w-full flex flex-col gap-2">
              <div className="w-full gap-2 flex flex-col">
                <h1 className="font-semibold flex gap-2 items-center">
                  <i>
                    <MdOutlineWorkOutline size={"1rem"} />
                  </i>
                  Competences
                </h1>
                <label className="flex items-center bg-slate-200 h-10 w-1/2 px-4 rounded-sm">
                  <span></span>
                </label>
              </div>
              <div className="w-full gap-2 flex flex-col">
                <h1 className="font-semibold flex gap-2 items-center">
                  <i>
                    <GrUserExpert size={"1rem"} />
                  </i>
                  Experiences
                </h1>
                <label className="flex items-center bg-slate-200 h-10 w-1/2 px-4 rounded-sm">
                  <span></span>
                </label>
              </div>
              <div className="w-full gap-2 flex flex-col">
                <h1 className="font-semibold flex gap-2 items-center">
                  <i>
                    <MdOutlineAssuredWorkload size={"1rem"} />
                  </i>
                  Formations
                </h1>
                <label className="flex items-center bg-slate-200 h-10 w-1/2 px-4 rounded-sm">
                  <span></span>
                </label>
              </div>
              <div className="w-full gap-2 flex flex-col">
                <h1 className="font-semibold flex gap-2 items-center">
                  <i>
                    <GrLanguage size={"1rem"} />
                  </i>
                  Langues
                </h1>
                <label className="flex items-center bg-slate-200 h-10 w-1/2 px-4 rounded-sm">
                  <span></span>
                </label>
              </div>
              <div className="w-full gap-2 flex flex-col">
                <h1 className="font-semibold flex gap-2 items-center">
                  <i>
                    <MdOutlineInterests size={"1.25rem"} />
                  </i>
                  Centre d'interet
                </h1>
                <label className="flex items-center bg-slate-200 h-10 w-1/2 px-4 rounded-sm">
                  <span></span>
                </label>
              </div>
              <div className="py-2">
                <button
                  onClick={() => setIsEditProfil(true)}
                  className="bg-blue-500 text-white h-10 w-1/2 rounded-sm flex items-center justify-center gap-2"
                >
                  <i className="text-white">
                    <MdModeEdit size={"1rem"} />
                  </i>
                  <span>Editer</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
