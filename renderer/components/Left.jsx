"use client";

import Image from "next/image";
import Link from "next/link";

import { HiOutlineHome } from "react-icons/hi2";
import { RiSettings4Line } from "react-icons/ri";
import { MdOutlineWorkspaces, MdRestore } from "react-icons/md";
import { BsStars } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { useContext } from "react";
import { UidContext } from "../context/UidContext";
import { IoLogOutOutline } from "react-icons/io5";

const menu = [
  {
    label: "Accueil",
    path: "accueil",
    icon: <HiOutlineHome size={"1.5rem"} />,
  },
  {
    label: "Postes",
    path: "postes",
    icon: <MdOutlineWorkspaces size={"1.5rem"} />,
  },
  {
    label: "Nouveau",
    path: "nouveau",
    icon: <BsStars size={"1.5rem"} />,
  },
  {
    label: "Recent",
    path: "recent",
    icon: <MdRestore size={"1.5rem"} />,
  },
];

export default function Left() {
  const { currentQuery, path } = useContext(UidContext);
  return (
    <>
      <div className="bg-slate-200 h-full w-full">
        <div className="relative flex flex-col justify-between h-full">
          <div className="flex items-center">
            <div className="h-16 w-16 relative">
              <Image src={"/logo-1.png"} fill alt="" className="rounded-full" />
            </div>
            <label className="font-semibold text-xl text-slate-600">
              JOB MATCHER
            </label>
          </div>
          <div className="px-5 gap-2 flex flex-col">
            {menu.map((item) => (
              <Link
                key={item.label}
                href={{
                  pathname: path,
                  query: {
                    path: item.path,
                  },
                }}
                className={`flex items-center gap-2 p-2 transition-all duration-150 ${
                  currentQuery.path === item.path
                    ? "bg-slate-100 border-l-2 border-slate-950"
                    : ""
                }`}
              >
                {item.icon}
                <span className="">{item.label}</span>
              </Link>
            ))}
          </div>
          <div className="p-5 gap-2 flex flex-col">
            <button
              className={`flex items-center gap-2 py-2 px-4 bg-red-500 rounded-md hover:outline outline-2 outline-offset-1 hover:outline-red-500`}
            >
              <i className="text-white">
                <IoLogOutOutline size={"1.5rem"} />
              </i>
              <span className="text-white">Se deconnecter</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
