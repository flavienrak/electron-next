import Image from "next/image";
import Link from "next/link";

export default function Container() {
  return (
    <div className="p-4 w-full">
      <div className="flex justify-between w-full border-b py-4">
        <div className="flex gap-2 items-center">
          <div className="relative h-12 w-12 rounded-full">
            <Image
              src={"/bg.jpg"}
              alt=""
              fill
              objectFit="cover"
              className="rounded-full"
            />
          </div>
          <div>
            <label htmlFor="" className="font-semibold">
              Mark JJ
            </label>
            <p className="text-xs">mark@gmail.com</p>
          </div>
        </div>
        <div>
          <Link href={"/profil"}>
            <label
              htmlFor=""
              className="bg-blue-400 py-2 px-4 rounded-md text-white"
            >
              Voir le profil
            </label>
          </Link>
        </div>
      </div>
      <div className="flex py-4 gap-4">
        <div className="">
          <label htmlFor="" className="bg-blue-400 px-4">
            Nouveau
          </label>
        </div>
        <div className="bg-gray-200 p-4 rounded-md flex flex-col gap-2">
          <div>
            <label htmlFor="" className="font-bold py-1">
              Projet 1
            </label>
          </div>
          <div className="text-md">Description du projet</div>
          <div className="flex justify-end">
            <Link href={"/projet"}>
              <label
                htmlFor=""
                className="text-xs bg-blue-400 px-2 py-1 rounded-md text-white"
              >
                Voir le projet
              </label>
            </Link>
          </div>
        </div>
        <div className="bg-gray-200 p-4 rounded-md flex flex-col gap-2">
          <div>
            <label htmlFor="" className="font-bold py-1">
              Projet 1
            </label>
          </div>
          <div className="text-md">Description du projet</div>
          <div className="flex justify-end">
            <Link href={"/projet"}>
              <label
                htmlFor=""
                className="text-xs bg-blue-400 px-2 py-1 rounded-md text-white"
              >
                Voir le projet
              </label>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
