"use client";

import Liste from "../utils/Liste";
import Link from "next/link";
import qs from "query-string";

import { isEmpty } from "../../lib/allFunctions";
import { MdOutlineWorkOutline } from "react-icons/md";
import { GrUserExpert } from "react-icons/gr";
import { LuListEnd } from "react-icons/lu";
import { FaArrowLeft, FaRegAddressBook } from "react-icons/fa";
import { FiEdit2, FiPhone } from "react-icons/fi";
import { GoLocation } from "react-icons/go";
import { BsPersonWorkspace } from "react-icons/bs";
import { GiBookmark } from "react-icons/gi";
import { PiStudent } from "react-icons/pi";
import { BiEqualizer } from "react-icons/bi";
import { useContext } from "react";
import { UidContext } from "../../context/UidContext";
import { matchPosteController } from "../../controllers/matchController";
import { useDispatch } from "react-redux";
import { updateMatchInfos } from "../../redux/slices/matchSlice";
import { useRouter } from "next/navigation";

export default function SinglePoste({
  poste,
  path,
  currentQuery,
  actualMatch,
}) {
  const { userId } = useContext(UidContext);
  const { push } = useRouter();
  const dispatch = useDispatch();

  const handleMatch = async () => {
    const res = await matchPosteController({ userId, posteId: poste.id });

    if (res?.match) {
      dispatch(updateMatchInfos({ match: res.match }));
      const url = qs.stringifyUrl(
        {
          url: path,
          query: {
            path: currentQuery.path,
            poste: currentQuery.poste,
            result: currentQuery.poste,
          },
        },
        { skipNull: true }
      );
      push(url);
    }
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
              },
            }}
            className="w-24"
          >
            <i className="text-[var(--primary-color)] cursor-pointer opacity-80 hover:opacity-100 transition-opacity duration-100">
              <FaArrowLeft size={"1.5rem"} />
            </i>
          </Link>
          <h1 className="relative w-max flex items-center justify-center text-4xl uppercase text-center font-semibold text-[var(--primary-color)] py-4">
            {poste.titre}
            <span className="absolute h-1 w-10 bg-[var(--primary-color)] rounded-full bottom-0"></span>
          </h1>
          <Link
            href={{
              pathname: path,
              query: {
                path: currentQuery.path,
                poste: currentQuery.poste,
                edit: currentQuery.poste,
              },
            }}
            className="flex justify-center gap-2 text-[var(--primary-color)] items-center border border-[var(--primary-color)] w-24 h-10 rounded-md"
          >
            <span>Editer</span>
            <i>
              <FiEdit2 size={"1.2rem"} />
            </i>
          </Link>
        </div>

        <div className="w-full grid grid-cols-2 gap-x-10 gap-y-4">
          {/* missions */}
          <Liste
            label={"Missions et Responsabilites"}
            icon={<MdOutlineWorkOutline size={"1rem"} />}
            array={poste.missions}
          />

          {/* localisation */}
          {(!isEmpty(poste.pays) || !isEmpty(poste.telephone)) && (
            <div className="flex flex-col gap-2 bg-[var(--bg)] px-4 py-2 rounded-sm">
              {!isEmpty(poste.pays) && (
                <label className="flex items-center gap-2 text-[var(--cont)]">
                  <i>
                    <GoLocation size={"1rem"} />
                  </i>
                  <p>
                    {!isEmpty(poste.pays) && (
                      <span className="uppercase font-bold">{poste.pays}</span>
                    )}
                    {!isEmpty(poste.region) && <span>, {poste.region}</span>}
                  </p>
                </label>
              )}
              {!isEmpty(poste.telephone) && (
                <label className="flex items-center gap-2 text-[var(--cont)]">
                  <i>
                    <FiPhone size={"1rem"} />
                  </i>
                  <p className="font-bold">
                    <span>+{poste.telephone}</span>
                  </p>
                </label>
              )}
            </div>
          )}

          {/* competences */}
          <Liste
            label={"Competences requises"}
            icon={<BsPersonWorkspace size={"1rem"} />}
            array={poste.competences}
            feminin={true}
          />

          {/* langues */}
          <Liste
            label={"Competences linguistiques"}
            icon={<GiBookmark size={"1rem"} />}
            array={poste.langues}
            feminin={true}
          />

          {/* experiences */}
          <Liste
            label={"Experiences requises"}
            icon={<FaRegAddressBook size={"1rem"} />}
            array={poste.experiences}
            feminin={true}
          />

          {/* diplomes */}
          <Liste
            label={"Diplomes requis"}
            icon={<PiStudent size={"1rem"} />}
            array={poste.diplomes}
          />

          {/* formations */}
          <Liste
            label={"Formations requises"}
            icon={<GrUserExpert size={"1rem"} />}
            array={poste.formations}
            feminin={true}
          />

          {/* Description */}
          <div className="flex flex-col gap-2 row-span-2 justify-between">
            <label
              htmlFor="description"
              className="font-semibold flex items-center gap-2 text-[var(--cont)]"
            >
              <i>
                <LuListEnd size={"1.25rem"} />
              </i>
              <span>Description du poste</span>
            </label>
            <textarea
              rows={5}
              type="text"
              id="description"
              readOnly
              defaultValue={poste.description}
              className="bg-[var(--bg)] py-2 px-4 focus:outline-1 focus:outline-slate-300 outline-offset-2 flex-1 text-[var(--cont)]"
            />
          </div>

          {/* qualites */}
          <Liste
            label={"Qualites requises"}
            icon={<BiEqualizer size={"1rem"} />}
            array={poste.qualites}
            feminin={true}
          />
        </div>

        {/* buttons */}
        <div className="w-full flex justify-end">
          <div className="flex gap-8 w-1/2 pl-6">
            {isEmpty(actualMatch) ? (
              <button
                onClick={handleMatch}
                className={`bg-[var(--primary-color)] text-white h-10 rounded-sm w-full opacity-80 hover:opacity-100 focus:opacity-100 cursor-pointer transition-opacity duration-100`}
              >
                <span>Evaluer</span>
              </button>
            ) : (
              <>
                <Link
                  href={{
                    pathname: path,
                    query: {
                      path: currentQuery.path,
                      poste: currentQuery.poste,
                      result: currentQuery.poste,
                    },
                  }}
                  className={`flex justify-center items-center text-[var(--primary-color)] border border-[var(--primary-color)] h-10 rounded-sm w-full opacity-80 hover:opacity-100 focus:opacity-100 cursor-pointer transition-opacity duration-100`}
                >
                  <span>Consulter</span>
                </Link>
                <button
                  onClick={handleMatch}
                  className={`bg-[var(--primary-color)] text-white h-10 rounded-sm w-full opacity-80 hover:opacity-100 focus:opacity-100 cursor-pointer transition-opacity duration-100`}
                >
                  <span>Reevaluer</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
