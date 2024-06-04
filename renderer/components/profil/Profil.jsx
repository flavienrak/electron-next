"use client";

import Top from "../Top";
import EditProfil from "./EditProfil";
import Liste from "../utils/Liste";

import {
  MdEmail,
  MdOutlineAssuredWorkload,
  MdOutlineWorkOutline,
  MdModeEdit,
} from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { HiPhone } from "react-icons/hi2";
import { GrLanguage, GrUserExpert } from "react-icons/gr";
import { IoCamera } from "react-icons/io5";
import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "../../lib/allFunctions";
import { UidContext } from "../../context/UidContext";
import { BiEqualizer } from "react-icons/bi";
import { TbMoodEdit } from "react-icons/tb";
import { PiStudent } from "react-icons/pi";

export default function Profil() {
  const { letter } = useContext(UidContext);
  const { user } = useSelector((state) => state.user);
  const [isEditProfil, setIsEditProfil] = useState(false);

  // const ville = City.getCitiesOfState().map(
  //   (city) => city.name === user?.ville
  // );

  return (
    <>
      <div className="w-full h-full bg-white flex flex-col">
        <Top label={"Profil"} />
        {isEditProfil ? (
          <EditProfil setIsEditProfil={setIsEditProfil} />
        ) : (
          <div className="bg-slate-100 p-8 rounded-md overflow-auto">
            <div className="flex flex-1 gap-10 flex-col">
              <div className="flex justify-between w-full items-center gap-8">
                {/* contacts */}
                <div className="w-1/3 flex flex-col gap-2">
                  <label className="flex items-center gap-2">
                    <i>
                      <HiPhone size={"1rem"} />
                    </i>
                    {!isEmpty(user.telephone) ? (
                      <span>+{user.telephone}</span>
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
                    {!isEmpty(user.pays) || !isEmpty(user.region) ? (
                      // || !isEmpty(user.ville)
                      <>
                        {/* {!isEmpty(user.ville) && <span>{region.ville}, </span>}{" "} */}
                        {!isEmpty(user.region) && <span>{user.region}, </span>}
                        {!isEmpty(user.pays) && <span>{user.pays}</span>}
                      </>
                    ) : (
                      <span className="text-slate-500 text-sm">{`< Aucun >`}</span>
                    )}
                  </label>
                </div>

                {/* profil */}
                <div className="w-1/3 flex justify-center items-center">
                  <div className="relative flex justify-center items-center min-h-36 min-w-36 w-36 rounded-full bg-[var(--primary-color)]">
                    <span className="text-6xl uppercase text-white">
                      {letter}
                    </span>
                    <label
                      htmlFor="file"
                      className="absolute bottom-1 right-1 min-w-8 min-h-8 flex justify-center items-center bg-white rounded-full cursor-pointer text-[var(--primary-color)]"
                    >
                      <IoCamera size={"1.5rem"} />
                    </label>
                    <input id="file" type="file" className="hidden" />
                  </div>
                </div>

                {/* infos */}
                <div className="w-1/3">
                  <label className="flex items-center gap-2 text-4xl uppercase text-slate-950">
                    {user.nom}
                  </label>
                  <label className="flex items-center gap-2 text-2xl pb-2 capitalize text-slate-950">
                    {user.prenom}
                  </label>
                  {!isEmpty(user?.postes) ? (
                    <>
                      <label className="flex items-center gap-1 border-l-2 border-slate-900 px-2 h-10 bg-slate-200">
                        {user.postes?.map((item, index) => (
                          <span
                            key={item}
                            className="whitespace-nowrap overflow-hidden"
                          >
                            {item}
                            {index !== user.postes.length - 1 && `, `}
                          </span>
                        ))}
                      </label>
                    </>
                  ) : (
                    <label className="flex items-center gap-2 px-2 h-10 bg-slate-200 text-slate-500 text-sm">
                      {`< Aucun poste >`}
                    </label>
                  )}
                </div>
              </div>

              <div className="w-full grid grid-cols-2 gap-x-10 gap-y-4">
                {/* competences */}
                <Liste
                  label={"Competences"}
                  icon={<MdOutlineWorkOutline size={"1rem"} />}
                  array={user.competences}
                  feminin={true}
                />

                {/* experiences */}
                <Liste
                  label={"Experiences"}
                  icon={<GrUserExpert size={"1rem"} />}
                  array={user.experiences}
                  feminin={true}
                />

                {/* diplomes */}
                <Liste
                  label={"Diplomes"}
                  icon={<PiStudent size={"1rem"} />}
                  array={user.diplomes}
                  feminin={true}
                />

                {/* formations */}
                <Liste
                  label={"Formations"}
                  icon={<MdOutlineAssuredWorkload size={"1rem"} />}
                  array={user.formations}
                  feminin={true}
                />

                {/* langues */}
                <Liste
                  label={"Langues"}
                  icon={<GrLanguage size={"1rem"} />}
                  array={user.langues}
                  feminin={true}
                />

                {/* qualites */}
                <Liste
                  label={"Qualites"}
                  icon={<BiEqualizer size={"1rem"} />}
                  array={user.qualites}
                  feminin={true}
                />

                {/* biographie */}
                <div className="gap-2 flex flex-col justify-between row-span-2 col-span-2">
                  <label className="font-semibold flex gap-2 items-center">
                    <i>
                      <TbMoodEdit size={"1.25rem"} />
                    </i>
                    Biographie
                  </label>
                  <textarea
                    readOnly
                    rows={5}
                    placeholder="Biographie"
                    defaultValue={user.biographie}
                    className="flex items-center bg-slate-200 py-2 px-4 rounded-sm focus:outline-slate-300 focus:outline-offset-2 h-full"
                  />
                </div>
              </div>

              {/* button */}
              <div className="flex justify-end">
                <div className="w-1/2 pl-6">
                  <button
                    onClick={() => setIsEditProfil(true)}
                    className="bg-[var(--primary-color)] text-white h-10 w-full rounded-sm flex items-center justify-center gap-2"
                  >
                    <i className="text-white">
                      <MdModeEdit size={"1rem"} />
                    </i>
                    <span>Editer</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
