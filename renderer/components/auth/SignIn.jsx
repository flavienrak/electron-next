import Link from "next/link";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UidContext } from "../../context/UidContext";
import { signInController } from "../../controllers/authController";
import { emailRegex } from "../../lib/regex";
import { useDispatch } from "react-redux";
import { updatePersistInfos } from "../../redux/slices/persistSlice";
import { MdEmail } from "react-icons/md";
import { IoMdLock } from "react-icons/io";

export default function SignInPage() {
  const { push } = useRouter();
  const { path, addMessage } = useContext(UidContext);
  const dispatch = useDispatch();
  const [email, setEmail] = useState({ valid: false, value: "" });
  const [password, setPassword] = useState({ valid: false, value: "" });
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = () => {
    // Ici, vous pouvez ajouter la logique de connexion
    // Après la connexion réussie, vous pouvez rediriger vers la page de bienvenue
    push("/hello");
  };

  useEffect(() => {
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
  }, [email.value, password.value]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);

    if (email.valid && password.valid) {
      setIsLoading(true);
      const res = await signInController({
        email: email.value,
        password: password.value,
      });
      setIsLoading(false);

      if (res?.userNotFound) {
        addMessage({
          value: `L'adresse email ${email.value} n'est pas encore enregistré.`,
          type: "error",
        });
      } else if (res?.incorrectPassword) {
        addMessage({
          value: `Le mot de passe que vous avez entré est incorrect.`,
          type: "error",
        });
      } else if (res?.user) {
        dispatch(updatePersistInfos({ authToken: res.token }));
        window.location = "/home?path=accueil";
      }
    }
  };

  return (
    <>
      <div className="w-full h-full flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="py-8 px-10 rounded-md shadow-md flex flex-col gap-5"
        >
          <div className="flex flex-col">
            <h1 className="text-3xl font-semibold text-[var(--primary-color)]">
              Se connecter
            </h1>
            <span className="min-h-1 w-2/3 bg-[var(--primary-color)] rounded-full"></span>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Email"
                  onChange={(e) =>
                    setEmail((prev) => ({ ...prev, value: e.target.value }))
                  }
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
                  onChange={(e) =>
                    setPassword((prev) => ({ ...prev, value: e.target.value }))
                  }
                  className="bg-slate-200 py-2 pl-10 pr-2 rounded-sm focus:outline outline-1 outline-offset-2 outline-slate-500"
                />
                <i className="text-slate-400 absolute left-3">
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
              {isLoading ? `Connexion...` : `Connexion`}
            </button>
          </div>
          <div className="px-1 flex items-center gap-1">
            <p className="text-xs">N'as pas encore de compte ?</p>
            <Link
              href={{
                pathname: path,
                query: {
                  path: "signUp",
                },
              }}
              className="flex justify-center items-center"
            >
              <span className="text-xs underline text-[var(--primary-color)]">
                S'inscrire
              </span>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
