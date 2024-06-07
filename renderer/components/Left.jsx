"use client";

import Link from "next/link";

import { HiOutlineHome, HiOutlineUser } from "react-icons/hi2";
import { MdOutlineWorkspaces } from "react-icons/md";
import { BsStars } from "react-icons/bs";
import { useContext } from "react";
import { UidContext } from "../context/UidContext";
import { IoLogOutOutline } from "react-icons/io5";
import { LuPalette } from "react-icons/lu";

const menu = [
  {
    label: "Accueil",
    path: "accueil",
    icon: <HiOutlineHome size={"1.5rem"} />,
  },
  {
    label: "Nouveau",
    path: "nouveau",
    icon: <BsStars size={"1.5rem"} />,
  },
  {
    label: "Postes",
    path: "postes",
    icon: <MdOutlineWorkspaces size={"1.5rem"} />,
  },
  {
    label: "Profil",
    path: "profil",
    icon: <HiOutlineUser size={"1.5rem"} />,
  },
  {
    label: "Themes",
    path: "theme",
    icon: <LuPalette size={"1.5rem"} />,
  },
];

export default function Left() {
  const { currentQuery, path, loginOut } = useContext(UidContext);

  return (
    <>
      <div className="h-full w-full">
        <div className="bg-[var(--bg-1)] h-full w-full flex flex-col rounded-md">
          <Link
            href={{
              pathname: path,
              query: {
                path: "accueil",
              },
            }}
            className="min-h-20 h-20 text-2xl font-semibold text-[var(--primary-color)] justify-center px-4 flex items-center gap-4"
          >
            <span className="flex items-center justify-center bg-[var(--primary-color)] px-4 text-white rounded-sm">
              JBM
            </span>{" "}
            <span className="text-2xl hidden md:block bgText">JOB MATCHER</span>
          </Link>
          <div className="w-full flex-1 bg-[var(--bg-gradient)] rounded-md p-8">
            <div className="relative flex flex-col justify-between h-full">
              <div className="gap-2 flex flex-col">
                {menu.map((item) => (
                  <Link
                    key={item.label}
                    href={{
                      pathname: path,
                      query: {
                        path: item.path,
                      },
                    }}
                    className={`flex items-center gap-2 p-2 transition-all duration-100 rounded-sm ${
                      currentQuery.path === item.path
                        ? "bg-[var(--bg)] text-[var(--primary-color)] border-l-2 border-[var(--primary-color)]"
                        : "text-[var(--cont)]"
                    }`}
                  >
                    {item.icon}
                    <span className="hidden md:block">{item.label}</span>
                  </Link>
                ))}
              </div>
              <div className="gap-2 flex flex-col">
                <button
                  onClick={() => loginOut(true)}
                  className={`flex items-center gap-2 p-2 border border-[var(--cont)] text-[var(--cont)] rounded-sm`}
                >
                  <i>
                    <IoLogOutOutline size={"1.5rem"} />
                  </i>
                  <span className="hidden md:block">Se deconnecter</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
