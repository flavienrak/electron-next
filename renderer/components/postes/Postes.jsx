import Top from "../Top";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

export default function Postes() {
  return (
    <>
      <div className="w-full h-full bg-white flex flex-col">
        <Top label={"Tous"} />
        <div className="flex gap-4 flex-1 items-center flex-col">
          <div className="flex gap-4 items-center">
            <i className="p-1 flex justify-center items-center">
              <IoIosArrowBack size={"1.5rem"} />
            </i>
            <div className="flex items-center gap-4">
              <span
                className={`text-xl flex items-center justify-center p-1 rounded-md cursor-pointer bg-slate-200 min-h-10 min-w-10 ${""}`}
              >
                1
              </span>
            </div>
            <i className="p-1 flex justify-center items-center">
              <IoIosArrowForward size={"1.5rem"} />
            </i>
          </div>
          <div className="w-full">
            <table className="w-full">
              <thead className="">
                <tr className="bg-slate-200 h-14">
                  <th className="text-center w-1/5 font-semibold text-md">
                    Titre
                  </th>
                  <th className="text-center w-1/5 font-semibold text-md">
                    Competences
                  </th>
                  <th className="text-center w-1/5 font-semibold text-md">
                    Diplomes
                  </th>
                  <th className="text-center w-1/5 font-semibold text-md">
                    Experiences
                  </th>
                  <th className="w-1/5"></th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-200">
                  <td className="text-center h-12 w-1/5 leading-4">
                    <label className="text-xs font-semibold">
                      Developpeur web
                    </label>
                  </td>
                  <td className="text-center h-10 w-1/5 leading-4">
                    <label className="text-xs">React JS</label>
                  </td>
                  <td className="text-center h-10 w-1/5 leading-4">
                    <label className="text-xs">
                      Ingenieur Genie Logiciel et Bases de Donnees
                    </label>
                  </td>
                  <td className="text-center h-10 w-1/5">
                    <label className="text-xs">3 a 5 ans</label>
                  </td>
                  <td className="text-center h-10 w-1/5">
                    <div className="flex items-center justify-center">
                      <button className="bg-slate-200 rounded-full px-3 py-2 flex items-center gap-1 justify-center">
                        <span className="text-xs font-semibold">Details</span>
                        <i>
                          <MdOutlineKeyboardDoubleArrowRight size={"1rem"} />
                        </i>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="text-center h-12 w-1/5 leading-4">
                    <label className="text-xs font-semibold">
                      Data analyst
                    </label>
                  </td>
                  <td className="text-center h-10 w-1/5 leading-4">
                    <label className="text-xs">Python</label>
                  </td>
                  <td className="text-center h-10 w-1/5 leading-4">
                    <label className="text-xs">
                      Ingenieur Genie Logiciel et Bases de Donnees
                    </label>
                  </td>
                  <td className="text-center h-10 w-1/5">
                    <label className="text-xs">3 a 5 ans</label>
                  </td>
                  <td className="text-center h-10 w-1/5">
                    <div className="flex items-center justify-center">
                      <button className="bg-slate-200 rounded-full px-3 py-2 flex items-center gap-1 justify-center">
                        <span className="text-xs font-semibold">Details</span>
                        <i>
                          <MdOutlineKeyboardDoubleArrowRight size={"1rem"} />
                        </i>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
