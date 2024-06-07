"use client";

import Link from "next/link";

import { signUpController } from "../../controllers/authController";
import { useContext, useEffect, useState } from "react";
import { emailRegex } from "../../lib/regex";
import { UidContext } from "../../context/UidContext";
import { useRouter } from "next/navigation";
import { MdEmail } from "react-icons/md";
import { IoMdLock } from "react-icons/io";
import { BiSolidUser } from "react-icons/bi";
import { useSelector } from "react-redux";
import { isEmpty } from "../../lib/allFunctions";

export default function SignUpPage() {
  const { path, addMessage } = useContext(UidContext);
  const { ip } = useSelector((state) => state.persistInfos);
  const { push } = useRouter();

  const [nom, setNom] = useState({ value: "", valid: false });
  const [prenom, setPrenom] = useState({ value: "", valid: false });
  const [email, setEmail] = useState({ value: "", valid: false });
  const [password, setPassword] = useState({ value: "", valid: false });
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // nom
    if (nom.value?.trim()?.length > 2) {
      setNom((prev) => ({ ...prev, valid: true }));
    } else {
      setNom((prev) => ({ ...prev, valid: false }));
    }

    // prenom
    if (prenom.value?.trim()?.length > 2) {
      setPrenom((prev) => ({ ...prev, valid: true }));
    } else {
      setPrenom((prev) => ({ ...prev, valid: false }));
    }

    // email
    if (emailRegex.test(email.value?.trim())) {
      setEmail((prev) => ({ ...prev, valid: true }));
    } else {
      setEmail((prev) => ({ ...prev, valid: false }));
    }

    // password
    if (password.value?.length > 5) {
      setPassword((prev) => ({ ...prev, valid: true }));
    } else {
      setPassword((prev) => ({ ...prev, valid: false }));
    }
  }, [nom.value, prenom.value, email.value, password.value]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);

    if (
      nom.valid &&
      prenom.valid &&
      email.valid &&
      password.valid &&
      !isEmpty(ip)
    ) {
      setIsLoading(true);
      const res = await signUpController({
        ip,
        nom: nom.value,
        prenom: prenom.value,
        email: email.value,
        password: password.value,
      });
      setIsLoading(false);

      if (res?.userAlreadyExist) {
        addMessage({
          value: `L'adresse email ${email.value} est déjà enregistré.`,
          type: "error",
        });
      } else if (res?.user) {
        addMessage({
          value: `Le compte a été créé avec succés. Veuillez vous connecter.`,
          type: "success",
        });
        push("/home?path=signIn");
      }
    }
  };

  return (
    <>
      <div className="w-full h-full flex justify-center items-center bg-[var(--bg)]">
        <form
          onSubmit={handleSubmit}
          className="p-10 rounded-md shadow-md flex flex-col gap-5 bg-[var(--bg-1)] w-96"
        >
          <div className="flex flex-col">
            <h1 className="text-3xl font-semibold text-[var(--primary-color)]">
              Creer un compte
            </h1>
            <span className="min-h-1 w-4/5 bg-[var(--primary-color)] rounded-full"></span>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Nom"
                  onChange={(e) =>
                    setNom((prev) => ({ ...prev, value: e.target.value }))
                  }
                  className="bg-[var(--bg)] py-2 pl-10 pr-2 rounded-sm focus:outline outline-1 outline-offset-2 outline-slate-500 text-[var(--cont)] w-full"
                />
                <i className="text-[var(--cont)] absolute left-3">
                  <BiSolidUser size={"1.15rem"} />
                </i>
              </div>
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Prenom"
                  onChange={(e) =>
                    setPrenom((prev) => ({ ...prev, value: e.target.value }))
                  }
                  className="bg-[var(--bg)] py-2 pl-10 pr-2 rounded-sm focus:outline outline-1 outline-offset-2 outline-slate-500 text-[var(--cont)] w-full"
                />
                <i className="text-[var(--cont)] absolute left-3">
                  <BiSolidUser size={"1.15rem"} />
                </i>
              </div>
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Email"
                  onChange={(e) =>
                    setEmail((prev) => ({ ...prev, value: e.target.value }))
                  }
                  className="bg-[var(--bg)] py-2 pl-10 pr-2 rounded-sm focus:outline outline-1 outline-offset-2 outline-slate-500 text-[var(--cont)] w-full"
                />
                <i className="text-[var(--cont)] absolute left-3">
                  <MdEmail size={"1.15rem"} />
                </i>
              </div>
              <div className="relative flex items-center">
                <input
                  type="password"
                  placeholder="Mot de passe"
                  onChange={(e) =>
                    setPassword((prev) => ({ ...prev, value: e.target.value }))
                  }
                  className="bg-[var(--bg)] py-2 pl-10 pr-2 rounded-sm focus:outline outline-1 outline-offset-2 outline-slate-500 text-[var(--cont)] w-full"
                />
                <i className="text-[var(--cont)] absolute left-3">
                  <IoMdLock size={"1.15rem"} />
                </i>
              </div>
            </div>
            <button
              type="submit"
              className={`bg-[var(--primary-color)] text-white py-2 rounded-sm ${
                isLoading ? `opacity-70` : ""
              }`}
            >
              {isLoading ? `Creation...` : `Creer`}
            </button>
          </div>
          <div className="px-1 flex items-center gap-1">
            <p className="text-sm text-[var(--cont)]">
              A deja un compte enregistré ?
            </p>
            <Link
              href={{
                pathname: path,
                query: {
                  path: "signIn",
                },
              }}
              className="flex justify-center items-center"
            >
              <span className={`text-sm underline text-[var(--primary-color)]`}>
                Se connecter
              </span>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
