import Link from "next/link";

import { useContext } from "react";
import { UidContext } from "../context/UidContext";
import { useSelector } from "react-redux";

export default function Top({ label }) {
  const { path, letter } = useContext(UidContext);
  const { user } = useSelector((state) => state.user);
  return (
    <>
      <div className="flex items-center min-h-20 h-20 px-8 rounded-md">
        <div className="flex justify-between items-center w-full">
          <label className="uppercase text-white">{label}</label>
          <div className="flex gap-2 items-center">
            <Link
              href={{
                pathname: path,
                query: {
                  path: "profil",
                },
              }}
              className="flex justify-between items-center gap-4"
            >
              {/* <i className="p-1 min-w-10 min-h-10 not-italic bg-white rounded-full flex justify-center items-center text-black uppercase">
                {letter}
              </i> */}
              <p className="flex items-center gap-2 text-white font-bold">
                <span className="capitalize">{user.prenom}</span>
                <span className="uppercase">{user.nom}</span>
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
