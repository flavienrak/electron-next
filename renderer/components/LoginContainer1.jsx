import { useState } from "react";
import { useRouter } from "next/router";
import { FaArrowLeftLong } from "react-icons/fa6";
import Link from "next/link";

export default function LoginContainer() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Votre logique de validation du formulaire ici
    if (!email || !password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }
    // Votre logique d'authentification ici
    try {
      // Ici vous pouvez effectuer une requête API pour l'authentification
      // Si l'authentification réussit, vous pouvez rediriger l'utilisateur vers la page d'accueil
      router.push("/home");
    } catch (error) {
      setError("Erreur lors de l'authentification. Veuillez réessayer.");
    }
  };

  return (
    <div className="h-screen relative flex justify-center items-center">
      <Link href="/home">
        <label
          htmlFor=""
          className="absolute top-2 left-4 text-blue-400 flex items-center gap-2 cursor-pointer"
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
        <form onSubmit={handleSubmit} className="flex gap-2 flex-col">
          <div className="flex gap-1 flex-col">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded-sm p-1"
              required
            />
          </div>
          <div className="flex gap-1 flex-col">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded-sm p-1"
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-400 rounded-sm py-2 text-white font-semibold"
          >
            Soumettre
          </button>
        </form>
      </div>
    </div>
  );
}
