import Head from "next/head";
import styles from "../styles/home.module.css";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Home page</title>
      </Head>
      <div
        className={`${styles.container} ${styles.bgImg} flex flex-col h-screen`}
      >
        <nav>
          <div className="flex justify-between">
            <div className="text-2xl font-bold text-white">
              <span className="text-3xl font-bold text-blue-500">Logo</span>
            </div>
            <div className="flex gap-4">
              <Link href={"/login"}>
                <label
                  htmlFor=""
                  className="border-2 border-white px-4 py-2 rounded-md text-white font-semibold"
                >
                  Se connecter
                </label>
              </Link>
              <Link href={"/register"}>
                <label
                  htmlFor=""
                  className="border-2 border-white px-4 py-2 rounded-md bg-blue text-white font-semibold"
                >
                  S'inscrire
                </label>
              </Link>
            </div>
          </div>
        </nav>
        <div className="flex flex-1 justify-center items-center">
          <Link href={"/container"}>
            <label
              htmlFor=""
              className="border-2 border-white bg-purple-900 text-white py-2 px-4 rounded-md"
            >
              User profile
            </label>
          </Link>
        </div>
      </div>
    </>
  );
}
