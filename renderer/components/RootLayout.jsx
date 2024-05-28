"use client";

import Head from "next/head";
import SignInPage from "./auth/SignIn";
import SignUpPage from "./auth/SignUp";
import TopLoadingBar from "./utils/TopLoadingBar";
import Left from "./Left";
import Accueil from "./accueil/Accueil";
import Recent from "./recent/Recent";
import Postes from "./postes/Postes";
import Nouveau from "./nouveau/Nouveau";
import Profil from "./profil/Profil";
import SinglePoste from "./postes/SinglePoste";
import Result from "./result/Result";

import { isEmpty } from "../lib/isEmpty";
import { useContext, useEffect, useState } from "react";
import { UidContext } from "../context/UidContext";
import { motion } from "framer-motion";

import { IoCloseOutline } from "react-icons/io5";

export default function RootLayout() {
  const { path, currentQuery, widthProgressBar, messages, removeMessage } =
    useContext(UidContext);
  const [title, setTitle] = useState("Landing");

  useEffect(() => {
    setTitle((prev) => {
      return prev;
    });
  }, [currentQuery?.path]);

  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="h-screen">
        <TopLoadingBar
          width={widthProgressBar}
          visible={widthProgressBar > 0}
        />
        <div className="flex h-full">
          <div className="w-1/4 h-full">
            <Left />
          </div>
          <div className="w-3/4 h-full px-10">
            {currentQuery.path === "recent" ? (
              <Recent />
            ) : currentQuery.path === "postes" ? (
              <Postes />
            ) : currentQuery.path === "nouveau" ? (
              <Nouveau />
            ) : currentQuery.path === "profil" ? (
              <Profil />
            ) : (
              // <Accueil />
              // <SinglePoste />
              <Result />
            )}
          </div>
        </div>

        {currentQuery?.path === "signIn" && <SignInPage />}
        {currentQuery?.path === "signUp" && <SignUpPage />}

        {!isEmpty(messages) && (
          <>
            {messages.map((mes, index) => (
              <motion.div
                key={index}
                initial={{ x: -25 }}
                animate={{ x: 0 }}
                className={`fixed bottom-2 left-2 text-white rounded-md pl-4 pr-8 py-2 transition-all duration-150 ease-linear shadow-md max-w-64 whitespace-wrap overflow-hidden ${
                  mes.type === "error" ? "bg-red-500" : "bg-green-500"
                }`}
              >
                <i
                  onClick={() => removeMessage(index)}
                  className={`absolute top-2 right-2 cursor-pointer hover:bg-slate-50 rounded-sm text-white`}
                >
                  <IoCloseOutline size={"1rem"} />
                </i>
                {mes.value}
              </motion.div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
