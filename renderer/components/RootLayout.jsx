"use client";

import Head from "next/head";
import Home from "./Home";
import Link from "next/link";
import Landing from "./Landing";
import SignInPage from "./auth/SignIn";
import SignUpPage from "./auth/SignUp";
import ResetPage from "./auth/Reset";
import ProfilPage from "./user/Profil";
import TopLoadingBar from "./utils/TopLoadingBar";

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
      <div>
        <TopLoadingBar
          width={widthProgressBar}
          visible={widthProgressBar > 0}
        />
        <div className="flex gap-4">
          <div>
            <Link
              href={{
                pathname: path,
                query: {},
              }}
            >
              <label htmlFor="">Accueil</label>
            </Link>
          </div>
          <div>
            <Link
              href={{
                pathname: path,
                query: {
                  path: "home",
                },
              }}
            >
              <label htmlFor="">Home</label>
            </Link>
          </div>
          <div>
            <Link href={"/jobDetails"}>
              <label htmlFor="">JobDetails</label>
            </Link>
          </div>
          <div>
            <Link href={"/jobspace"}>
              <label htmlFor="">JobSpace</label>
            </Link>
          </div>
          <div>
            <Link href={"/more"}>
              <label htmlFor="">More</label>
            </Link>
          </div>
          <div>
            <Link
              href={{
                pathname: path,
                query: {
                  path: "profil",
                },
              }}
            >
              <label htmlFor="">Profil</label>
            </Link>
          </div>
          <div>
            <Link href={"/resultat"}>
              <label htmlFor="">Resultat</label>
            </Link>
          </div>
          <div>
            <Link href={"/setting"}>
              <label htmlFor="">Setting</label>
            </Link>
          </div>
        </div>

        {isEmpty(currentQuery?.path) && <Landing />}
        {currentQuery?.path === "home" && <Home />}
        {currentQuery?.path === "signIn" && <SignInPage />}
        {currentQuery?.path === "signUp" && <SignUpPage />}
        {currentQuery?.path === "reset" && <ResetPage />}
        {currentQuery?.path === "profil" && <ProfilPage />}
        {/* {currentQuery?.path === "register" && <SignUpPage />} */}
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
