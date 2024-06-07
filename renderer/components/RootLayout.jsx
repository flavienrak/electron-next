"use client";

import Head from "next/head";
import SignInPage from "./auth/SignIn";
import SignUpPage from "./auth/SignUp";
import TopLoadingBar from "./utils/TopLoadingBar";
import Left from "./Left";
import Accueil from "./accueil/Accueil";
import Postes from "./postes/Postes";
import Nouveau from "./postes/Nouveau";
import Profil from "./profil/Profil";
import Theme from "./theme/Theme";

import { isEmpty, isValidIPAdress } from "../lib/allFunctions";
import { useContext, useEffect, useRef, useState } from "react";
import { UidContext } from "../context/UidContext";
import { motion } from "framer-motion";

import { IoCloseOutline } from "react-icons/io5";
import { updatePersistInfos } from "../redux/slices/persistSlice";
import { useDispatch, useSelector } from "react-redux";

export default function RootLayout() {
  const {
    currentQuery,
    widthProgressBar,
    messages,
    removeMessage,
    isLoadingJWT,
    showLogout,
    loginOut,
  } = useContext(UidContext);

  const { authToken, theme, mode, ip } = useSelector(
    (state) => state.persistInfos
  );
  const ref = useRef(null);
  const dispatch = useDispatch();

  const [title, setTitle] = useState("Accueil");
  const [ipAdress, setIpAdress] = useState({
    value: ip || "",
    valid: !isEmpty(ip),
  });
  const [typeServerAdress, setTypeServerAdress] = useState(isEmpty(ip));

  useEffect(() => {
    if (currentQuery?.path) {
      setTitle((prev) => {
        let newState = prev;
        if (currentQuery.path === "postes") {
          newState = "Postes";
        } else if (currentQuery.path === "nouveau") {
          newState = "Nouveau";
        } else if (currentQuery.path === "profil") {
          newState = "Profil";
        } else if (currentQuery.path === "theme") {
          newState = "Theme";
        } else {
          newState = "Accueil";
        }
        return newState;
      });
    }
  }, [currentQuery?.path]);

  useEffect(() => {
    if (isValidIPAdress(ipAdress.value)) {
      if (!ipAdress.valid) {
        setIpAdress((prev) => ({ ...prev, valid: true }));
      }
    } else {
      if (ipAdress.valid) {
        setIpAdress((prev) => ({ ...prev, valid: false }));
      }
    }
  }, [ipAdress.value]);

  const handleLogout = async () => {
    if (authToken) {
      dispatch(updatePersistInfos({ authToken: "" }));
    }

    window.location = "/home?path=signIn";
  };

  const handleSubmitIP = (e) => {
    e.preventDefault();
    if (ipAdress.valid) {
      dispatch(updatePersistInfos({ ip: ipAdress.value }));
      setTypeServerAdress(false);
    }
  };

  return (
    <div
      className={`${
        theme === "green"
          ? "greenTheme"
          : theme === "yellow"
          ? "yellowTheme"
          : theme === "red"
          ? "redTheme"
          : theme === "green"
          ? "greenTheme"
          : theme === "purple"
          ? "purpleTheme"
          : "blueTheme"
      }`}
    >
      <div className={`${mode === "dark" ? "darkMode" : "lightMode"}`}>
        <Head>
          <title>{title}</title>
        </Head>
        <div className="h-screen">
          <TopLoadingBar
            width={widthProgressBar}
            visible={widthProgressBar > 0}
          />
          {currentQuery?.path === "signIn" ? (
            <SignInPage setTypeServerAdress={setTypeServerAdress} />
          ) : currentQuery?.path === "signUp" ? (
            <SignUpPage />
          ) : (
            isLoadingJWT === false && (
              <div className="flex h-full p-4 gap-4 bg-[var(--bg)]">
                <div className="w-max h-full">
                  <Left />
                </div>
                <div className="h-full flex-1">
                  {currentQuery.path === "postes" ? (
                    <Postes />
                  ) : currentQuery.path === "nouveau" ? (
                    <Nouveau />
                  ) : currentQuery.path === "profil" ? (
                    <Profil />
                  ) : currentQuery.path === "theme" ? (
                    <Theme />
                  ) : (
                    <Accueil />
                  )}
                </div>
              </div>
            )
          )}

          {showLogout && (
            <div className="fixed top-0 left-0 h-full w-full flex justify-center items-center bg-slate-900 bg-opacity-25">
              <motion.div
                ref={ref}
                initial={{ y: -15 }}
                animate={{ y: 0 }}
                className="p-6 rounded-md bg-[var(--bg-1)] flex justify-center items-center flex-col gap-4 w-80 transition-all duration-100 ease-linear border border-slate-500"
              >
                <h1 className="uppercase text-center text-[var(--cont)]">
                  Voulez vous vraiment vous deconnecter ?
                </h1>
                <div className="flex gap-4">
                  <button
                    onClick={() => loginOut(false)}
                    className="uppercase w-20 h-8 rounded-sm text-red-500 border border-red-500 hover:bg-[var(--bg-red-5)]"
                  >
                    Non
                  </button>
                  <button
                    onClick={handleLogout}
                    className="uppercase w-20 h-8 bg-green-500 rounded-sm text-white"
                  >
                    Oui
                  </button>
                </div>
              </motion.div>
            </div>
          )}

          {typeServerAdress && (
            <div className="fixed top-0 left-0 h-full w-full flex justify-center items-center bg-slate-900 bg-opacity-25 z-20">
              <motion.form
                ref={ref}
                initial={{ y: -15 }}
                animate={{ y: 0 }}
                onSubmit={handleSubmitIP}
                className="p-8 rounded-md bg-[var(--bg-1)] w-80 flex justify-center flex-col gap-4 transition-all duration-100 ease-linear border border-slate-500"
              >
                <h1 className="uppercase text-[var(--cont)]">
                  Adresse IP du serveur
                </h1>
                <input
                  type="text"
                  value={ipAdress.value}
                  onChange={(e) =>
                    setIpAdress((prev) => ({
                      ...prev,
                      value: e.target.value,
                    }))
                  }
                  className="bg-[var(--bg)] p-2 rounded-sm focus:outline outline-1 outline-offset-2 outline-slate-500 text-[var(--cont)]"
                />
                <div className="flex gap-4 w-full">
                  <button
                    type="submit"
                    disabled={!ipAdress.valid}
                    className={`uppercase w-full h-10 bg-[var(--primary-color)] rounded-sm text-white ${
                      ipAdress.valid
                        ? "opacity-100 cursor-pointer"
                        : "opacity-80"
                    }`}
                  >
                    Valider
                  </button>
                </div>
              </motion.form>
            </div>
          )}

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
    </div>
  );
}
