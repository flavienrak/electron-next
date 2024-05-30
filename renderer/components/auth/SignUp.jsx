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

export default function SignUpPage() {
  const { path, addMessage } = useContext(UidContext);
  const { push } = useRouter();

  const [nom, setNom] = useState({ value: "", valid: false });
  const [prenom, setPrenom] = useState({ value: "", valid: false });
  const [email, setEmail] = useState({ value: "", valid: false });
  const [password, setPassword] = useState({ value: "", valid: false });
  const [confirmPassword, setConfirmPassword] = useState({
    value: "",
    valid: false,
  });
  const [isSubmit, setIsSubmit] = useState(false);

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

    // confirm password
    if (
      password.value?.length > 5 &&
      confirmPassword.value === password.value
    ) {
      setConfirmPassword((prev) => ({ ...prev, valid: true }));
    } else {
      setConfirmPassword((prev) => ({ ...prev, valid: false }));
    }
  }, [
    nom.value,
    prenom.value,
    email.value,
    password.value,
    confirmPassword.value,
  ]);

  const handleSubmit = async () => {
    setIsSubmit(true);

    if (
      nom.valid &&
      prenom.valid &&
      email.valid &&
      password.valid &&
      confirmPassword.valid
    ) {
      const res = await signUpController({
        nom: nom.value,
        prenom: prenom.value,
        email: email.value,
        password: password.value,
      });
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
        push("/home?path=login");
      }
    }
  };

  return (
    <>
      <div className="w-full h-full flex justify-center items-center">
        <form className="py-8 px-10 rounded-md shadow-md flex flex-col gap-5">
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
                  className="bg-slate-200 py-2 pl-10 pr-2 rounded-sm focus:outline outline-1 outline-offset-2 outline-slate-500"
                />
                <i className="text-slate-400 absolute left-3">
                  <BiSolidUser size={"1.15rem"} />
                </i>
              </div>
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Prenom"
                  className="bg-slate-200 py-2 pl-10 pr-2 rounded-sm focus:outline outline-1 outline-offset-2 outline-slate-500"
                />
                <i className="text-slate-400 absolute left-3">
                  <BiSolidUser size={"1.15rem"} />
                </i>
              </div>
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Email"
                  className="bg-slate-200 py-2 pl-10 pr-2 rounded-sm focus:outline outline-1 outline-offset-2 outline-slate-500"
                />
                <i className="text-slate-400 absolute left-3">
                  <MdEmail size={"1.15rem"} />
                </i>
              </div>
              <div className="relative flex items-center">
                <input
                  type="password"
                  placeholder="Mot de passe"
                  className="bg-slate-200 py-2 pl-10 pr-2 rounded-sm focus:outline outline-1 outline-offset-2 outline-slate-500"
                />
                <i className="text-slate-400 absolute left-3">
                  <IoMdLock size={"1.15rem"} />
                </i>
              </div>
            </div>
            <button
              type="submit"
              className="bg-[var(--primary-color)] text-white py-2 rounded-md"
            >
              Creer
            </button>
          </div>
          <div className="px-1 flex items-center gap-1">
            <p className="text-xs">A deja un compte enregistré ?</p>
            <Link
              href={{
                pathname: path,
                query: {
                  path: "signIn",
                },
              }}
              className="flex justify-center items-center"
            >
              <span className="text-xs underline text-[var(--primary-color)]">
                Se connecter
              </span>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
