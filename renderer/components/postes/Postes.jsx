"use client";

import Top from "../Top";
import Link from "next/link";
import Result from "../result/Result";
import EditPoste from "../postes/EditPoste";
import SinglePoste from "../postes/SinglePoste";
import qs from "query-string";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { useSelector } from "react-redux";
import { isEmpty, isValidNumber } from "../../lib/allFunctions";
import { useContext, useEffect, useState } from "react";
import { UidContext } from "../../context/UidContext";
import { useRouter } from "next/navigation";

const perPage = 8;

export default function Postes() {
  const { path, currentQuery, userId } = useContext(UidContext);
  const { postes } = useSelector((state) => state.postes);
  const { match } = useSelector((state) => state.match);
  const { push } = useRouter();

  const pages = Array.from(
    { length: Math.ceil(postes?.length / perPage) },
    (_, index) => index + 1
  );

  const [actualPage, setActualPage] = useState(1);
  const [singlePoste, setSinglePoste] = useState({});

  const [actualMatch, setActualMatch] = useState(
    match?.find(
      (item) => item.userId == userId && item.posteId == currentQuery.poste
    ) || {}
  );

  useEffect(() => {
    if (isValidNumber(Number(currentQuery?.poste))) {
      setSinglePoste(postes?.find((item) => item.id == currentQuery.poste));
      setActualMatch(() =>
        match?.find(
          (item) => item.userId == userId && item.posteId == currentQuery.poste
        )
      );
    } else {
      const url = qs.stringifyUrl(
        { url: path, query: { path: "postes" } },
        { skipNull: true }
      );
      push(url);
      setSinglePoste({});
      setActualMatch({});
    }
  }, [currentQuery?.poste, postes, match]);

  return (
    <>
      <div className="w-full h-full bg-[var(--primary-color)] rounded-md flex flex-col">
        <Top label={"Postes"} />
        <div className="flex-1 bg-[var(--bg-1)] p-8 rounded-md overflow-auto">
          <div className="flex gap-10 flex-col">
            {!isEmpty(postes) ? (
              <>
                {!isEmpty(singlePoste) && !isEmpty(currentQuery?.edit) ? (
                  <>
                    <EditPoste
                      path={path}
                      poste={singlePoste}
                      currentQuery={currentQuery}
                    />
                  </>
                ) : !isEmpty(singlePoste) && !isEmpty(currentQuery?.view) ? (
                  <>
                    <SinglePoste
                      path={path}
                      poste={singlePoste}
                      currentQuery={currentQuery}
                      actualMatch={actualMatch}
                    />
                  </>
                ) : !isEmpty(singlePoste) &&
                  !isEmpty(currentQuery?.result) &&
                  !isEmpty(actualMatch) ? (
                  <>
                    <Result
                      path={path}
                      poste={singlePoste}
                      currentQuery={currentQuery}
                      actualMatch={actualMatch}
                    />
                  </>
                ) : (
                  <>
                    {postes.length > 8 && (
                      <div className="flex gap-4 items-center justify-center">
                        <i className="p-1 flex justify-center items-center text-slate-950">
                          <IoIosArrowBack size={"1.5rem"} />
                        </i>
                        <div className="flex items-center gap-4">
                          {pages.map((item, index) => (
                            <span
                              key={item}
                              onClick={() => setActualPage(item)}
                              className={`text-xl flex items-center justify-center p-1 rounded-md cursor-pointer min-h-8 min-w-8 ${
                                false
                                  ? "bg-[var(--primary-color)] text-white"
                                  : "text-slate-950"
                              }`}
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                        <i className="p-1 flex justify-center items-center text-slate-950">
                          <IoIosArrowForward size={"1.5rem"} />
                        </i>
                      </div>
                    )}

                    <div className="w-full">
                      <table className="w-full border border-[var(--bg)] rounded-sm">
                        <thead className="">
                          <tr className="bg-[var(--bg)] h-14">
                            <th className="w-1/5 font-semibold text-left px-4 text-[var(--cont)]">
                              Titre
                            </th>
                            <th className="w-1/5 font-semibold text-left px-4 text-[var(--cont)]">
                              Competences
                            </th>
                            <th className="w-1/5 font-semibold text-left px-4 text-[var(--cont)]">
                              Diplomes
                            </th>
                            <th className="w-1/5 font-semibold text-left px-4 text-[var(--cont)]">
                              Experiences
                            </th>
                            <th className="w-1/5 font-semibold text-left px-4 text-[var(--cont)]">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {postes.map((item, index) => {
                            if (
                              index >= (actualPage - 1) * perPage &&
                              index < actualPage * perPage
                            )
                              return (
                                <tr
                                  key={item.id}
                                  className={`border-b border-[var(--bg)] ${
                                    index % 2 !== 0 ? "bg-[var(--bg)]" : ""
                                  }`}
                                >
                                  <td className="h-12 w-1/5 leading-4 px-4">
                                    <label className="text-sm font-semibold text-[var(--cont)]">
                                      {item.titre}
                                    </label>
                                  </td>
                                  <td className="h-10 w-1/5 leading-4 px-4">
                                    <label className="text-[var(--cont)]">
                                      {!isEmpty(item.competences) &&
                                        item.competences.map((itm, i) => (
                                          <span key={itm} className="text-sm">
                                            {itm}
                                            {i !==
                                              item.competences.length - 1 &&
                                              `, `}
                                          </span>
                                        ))}
                                    </label>
                                  </td>
                                  <td className="h-10 w-1/5 leading-4 px-4">
                                    <label className="text-[var(--cont)]">
                                      {!isEmpty(item.diplomes) &&
                                        item.diplomes.map((itm, i) => (
                                          <span key={itm} className="text-sm">
                                            {itm}
                                            {i !== item.diplomes.length - 1 &&
                                              `, `}
                                          </span>
                                        ))}
                                    </label>
                                  </td>
                                  <td className="h-10 w-1/5 px-4">
                                    <label className="text-[var(--cont)]">
                                      {!isEmpty(item.experiences) &&
                                        item.experiences.map((itm, i) => (
                                          <span key={itm} className="text-sm">
                                            {itm}
                                            {i !==
                                              item.experiences.length - 1 &&
                                              `, `}
                                          </span>
                                        ))}
                                    </label>
                                  </td>
                                  <td className="text-center h-10 w-1/5 px-4">
                                    <div className="flex items-center">
                                      <Link
                                        href={{
                                          pathname: path,
                                          query: {
                                            path: currentQuery.path,
                                            poste: item.id,
                                            view: item.id,
                                          },
                                        }}
                                        className="bg-[var(--bg)] rounded-full px-3 py-2 flex items-center gap-1 justify-center text-[var(--cont)]"
                                      >
                                        <span className="text-xs font-semibold">
                                          Details
                                        </span>
                                        <i>
                                          <MdOutlineKeyboardDoubleArrowRight
                                            size={"1rem"}
                                          />
                                        </i>
                                      </Link>
                                    </div>
                                  </td>
                                </tr>
                              );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
                <label className="uppercase text-slate-900 text-center">{`< Aucun poste enregistre >`}</label>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
