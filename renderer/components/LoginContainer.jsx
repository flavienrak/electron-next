import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function LoginContainer() {
  return (
    <div className="h-screen relative flex justify-center items-center">
      <Link href={"/home"}>
        <label
          htmlFor=""
          className="absolute top-2 left-4 text-blue-400 flex items-center gap-2 "
        >
          <i className="flex justify-center items-center">
            <FaArrowLeftLong size={"1rem"} />
          </i>
          Revenir
        </label>
      </Link>
      <div className="flex flex-col gap-4">
        <label htmlFor="" className="text-4xl font-semibold text-blue-400">
          Se connecter
        </label>
        <form action="" className="flex gap-2 flex-col">
          <div className="flex gap-1 flex-col">
            <label htmlFor="name">Email</label>
            <input type="text" id="name" className="border rounded-sm p-1" />
          </div>
          <div className="flex gap-1 flex-col">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              className="border rounded-sm p-1"
            />
          </div>
          <button className="w-full bg-blue-400 rounded-sm py-2 text-white font-semibold">
            Soumettre
          </button>
        </form>
      </div>
    </div>
  );
}
