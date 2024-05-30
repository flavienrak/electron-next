import Link from "next/link";

import { useContext } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { UidContext } from "../context/UidContext";

export default function Top({ label, notif }) {
  const { path, letter } = useContext(UidContext);
  return (
    <>
      <div className="h-16 flex items-center">
        <div className="flex justify-between items-center w-full">
          <label className="uppercase">{label}</label>
          <div className="flex gap-2 items-center">
            <Link
              href={{
                pathname: path,
                query: {
                  path: "profil",
                },
              }}
              className="flex justify-center items-center"
            >
              <i className="p-1 min-w-10 min-h-10 not-italic bg-[var(--primary-color)] rounded-full flex justify-center items-center text-white">
                {letter}
              </i>
            </Link>
            <i className="p-1 min-w-10 min-h-10 not-italic bg-slate-200 rounded-full flex justify-center items-center">
              <IoIosNotificationsOutline size={"1.5rem"} />
            </i>
          </div>
        </div>
      </div>
    </>
  );
}
