"use client";

import Top from "../Top";

import { AiOutlineRight } from "react-icons/ai";

export default function Recent() {
  return (
    <>
      <div className="w-full h-full bg-white flex flex-col">
        <Top label={"Recent"} />
        <div className="flex gap-4 flex-1 items-center flex-col justify-between">
          <div className="w-full flex-1 flex flex-col gap-4">
            <label className="border-b border-slate-500 w-full py-2 font-semibold text-slate-500 flex">{`< Activites recentes >`}</label>
            <div className="grid grid-cols-4 gap-4">
              <div className="p-4 rounded-md gap-4 flex flex-col bg-slate-200">
                <h1 className="font-semibold text-xl">Titre du poste</h1>
                <div className="pl-1">
                  <p className="line-clamp-3 leading-4 text-xs">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Ullam neque qui tempora? Dolorem saepe expedita minus libero
                    facilis ut alias quas repellendus? Numquam perferendis illo
                    amet reprehenderit, labore ex unde.
                  </p>
                </div>
                <div className="w-full flex justify-end items-center">
                  <button className="bg-slate-300 p-2 rounded-md w-max">
                    <i>
                      <AiOutlineRight size={"1rem"} />
                    </i>
                  </button>
                </div>
              </div>
              <div className="p-4 rounded-md gap-4 flex flex-col bg-slate-200">
                <h1 className="font-semibold text-xl">Titre du poste</h1>
                <div className="pl-1">
                  <p className="line-clamp-3 leading-4 text-xs">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Ullam neque qui tempora? Dolorem saepe expedita minus libero
                    facilis ut alias quas repellendus? Numquam perferendis illo
                    amet reprehenderit, labore ex unde.
                  </p>
                </div>
                <div className="w-full flex justify-end items-center">
                  <button className="bg-slate-300 p-2 rounded-md w-max">
                    <i>
                      <AiOutlineRight size={"1rem"} />
                    </i>
                  </button>
                </div>
              </div>
              <div className="p-4 rounded-md gap-4 flex flex-col bg-slate-200">
                <h1 className="font-semibold text-xl">Titre du poste</h1>
                <div className="pl-1">
                  <p className="line-clamp-3 leading-4 text-xs">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Ullam neque qui tempora? Dolorem saepe expedita minus libero
                    facilis ut alias quas repellendus? Numquam perferendis illo
                    amet reprehenderit, labore ex unde.
                  </p>
                </div>
                <div className="w-full flex justify-end items-center">
                  <button className="bg-slate-300 p-2 rounded-md w-max">
                    <i>
                      <AiOutlineRight size={"1rem"} />
                    </i>
                  </button>
                </div>
              </div>
              <div className="p-4 rounded-md gap-4 flex flex-col bg-slate-200">
                <h1 className="font-semibold text-xl">Titre du poste</h1>
                <div className="pl-1">
                  <p className="line-clamp-3 leading-4 text-xs">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Ullam neque qui tempora? Dolorem saepe expedita minus libero
                    facilis ut alias quas repellendus? Numquam perferendis illo
                    amet reprehenderit, labore ex unde.
                  </p>
                </div>
                <div className="w-full flex justify-end items-center">
                  <button className="bg-slate-300 p-2 rounded-md w-max">
                    <i>
                      <AiOutlineRight size={"1rem"} />
                    </i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex-1 flex flex-col gap-4">
            <label className="border-b border-slate-500 w-full py-2 font-semibold text-slate-500 flex">{`< Nouvelles suggestions >`}</label>
            <div className="grid grid-cols-4 gap-4">
              <div className="p-4 rounded-md gap-4 flex flex-col bg-slate-200">
                <h1 className="font-semibold text-xl">Titre du poste</h1>
                <div className="pl-1">
                  <p className="line-clamp-1 leading-4 text-xs">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Ullam neque qui tempora? Dolorem saepe expedita minus libero
                    facilis ut alias quas repellendus? Numquam perferendis illo
                    amet reprehenderit, labore ex unde.
                  </p>
                </div>
              </div>
              <div className="p-4 rounded-md gap-4 flex flex-col bg-slate-200">
                <h1 className="font-semibold text-xl">Titre du poste</h1>
                <div className="pl-1">
                  <p className="line-clamp-1 leading-4 text-xs">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Ullam neque qui tempora? Dolorem saepe expedita minus libero
                    facilis ut alias quas repellendus? Numquam perferendis illo
                    amet reprehenderit, labore ex unde.
                  </p>
                </div>
              </div>
              <div className="p-4 rounded-md gap-4 flex flex-col bg-slate-200">
                <h1 className="font-semibold text-xl">Titre du poste</h1>
                <div className="pl-1">
                  <p className="line-clamp-1 leading-4 text-xs">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Ullam neque qui tempora? Dolorem saepe expedita minus libero
                    facilis ut alias quas repellendus? Numquam perferendis illo
                    amet reprehenderit, labore ex unde.
                  </p>
                </div>
              </div>
              <div className="p-4 rounded-md gap-4 flex flex-col bg-slate-200">
                <h1 className="font-semibold text-xl">Titre du poste</h1>
                <div className="pl-1">
                  <p className="line-clamp-1 leading-4 text-xs">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Ullam neque qui tempora? Dolorem saepe expedita minus libero
                    facilis ut alias quas repellendus? Numquam perferendis illo
                    amet reprehenderit, labore ex unde.
                  </p>
                </div>
              </div>
              <div className="p-4 rounded-md gap-4 flex flex-col bg-slate-200">
                <h1 className="font-semibold text-xl">Titre du poste</h1>
                <div className="pl-1">
                  <p className="line-clamp-1 leading-4 text-xs">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Ullam neque qui tempora? Dolorem saepe expedita minus libero
                    facilis ut alias quas repellendus? Numquam perferendis illo
                    amet reprehenderit, labore ex unde.
                  </p>
                </div>
              </div>
            </div>{" "}
          </div>
        </div>
      </div>
    </>
  );
}
