import Image from "next/image";
import Link from "next/link";

const ProjectCard = ({ title, description, link }) => (
  <div className="bg-gray-200 p-4 rounded-md flex flex-col gap-2">
    <div>
      <label htmlFor="" className="font-bold py-1">
        {title}
      </label>
    </div>
    <div className="text-md">{description}</div>
    <div className="flex justify-end">
      <Link href={link}>
        <label
          htmlFor=""
          className="text-xs bg-blue-400 px-2 py-1 rounded-md text-white cursor-pointer"
        >
          Voir le projet
        </label>
      </Link>
    </div>
  </div>
);

export default function ProfileContainer() {
  return (
    <div className="p-4 w-full">
      <div className="flex justify-between w-full border-b py-4">
        <div className="flex gap-2 items-center">
          <div className="relative h-12 w-12 rounded-full overflow-hidden">
            {/* Insérez votre image ici */}
            <Image
              src={"/lovely.jpg"}
              alt=""
              layout="fill"
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
              className="bg-blue-400 py-2 px-4 rounded-md text-white cursor-pointer"
            >
              Voir le profil
            </label>
          </Link>
        </div>
      </div>
      <div className="flex py-4 gap-4">
        <div>
          <label
            htmlFor=""
            className="bg-blue-400 px-4 py-1 rounded-md text-white"
          >
            Nouveau
          </label>
        </div>
        <ProjectCard
          title="Projet 1"
          description="Description du projet"
          link="/projet"
        />
        <ProjectCard
          title="Projet 2"
          description="Description du projet"
          link="/projet"
        />
        {/* Ajoutez d'autres projets ici */}
      </div>
    </div>
  );
}
