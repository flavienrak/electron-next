"use client";

import Head from "next/head";
import Home from "./Home";
import Link from "next/link";
import Landing from "./Landing";
import SignInPage from "./auth/SignIn";
import SignUpPage from "./auth/SignUp";
import ResetPage from "./auth/Reset";
// import SignUpPage from "./signup";

import { isEmpty } from "../lib/isEmpty";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { UidContext } from "../context/UidContext";

export default function RootLayout() {
  const { path, currentQuery } = useContext(UidContext);
  const { authToken } = useSelector((state) => state.persistInfos);
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
                  path: "description",
                },
              }}
            >
              <label htmlFor="">Description</label>
            </Link>
          </div>
          <div>
            <Link
              href={{
                pathname: path,
                query: {
                  path: "reset",
                },
              }}
            >
              <label htmlFor="">ForgetPassword</label>
            </Link>
          </div>
          <div>
            <Link
              href={{
                pathname: path,
                query: {
                  path: "hello",
                },
              }}
            >
              <label htmlFor="">Hello</label>
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
            <Link href={"/profil"}>
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
          <div>
            <Link href={"/signin"}>
              <label htmlFor="">SignIn</label>
            </Link>
          </div>
          <div>
            <Link href={"/signup"}>
              <label htmlFor="">SignUp</label>
            </Link>
          </div>
        </div>

        {isEmpty(currentQuery?.path) && <Landing />}
        {currentQuery?.path === "home" && <Home />}
        {currentQuery?.path === "signIn" && <SignInPage />}
        {currentQuery?.path === "signUp" && <SignUpPage />}
        {currentQuery?.path === "reset" && <ResetPage />}
        {/* {currentQuery?.path === "register" && <SignUpPage />} */}
      </div>
    </div>
  );
}
