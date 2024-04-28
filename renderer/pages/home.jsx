import React from "react";
import Head from "next/head";
import Link from "next/link";
// import Link from "description/link";
import Image from "next/image";
import styles from "../styles/home.module.css";

export default function HomePage() {
  const [message, setMessage] = React.useState("No message found");

  React.useEffect(() => {
    window.ipc.on("message", (message) => {
      setMessage(message);
    });
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Home</title>
      </Head>
      <div>
        <p>
          ⚡ Electron + Next.js ⚡ - <Link href="/next">Go to next page</Link>
        </p>
        <p>
          ⚡ Electron + Next.js ⚡ -{" "}
          <Link href="/description">Go to desc page</Link>
        </p>
        <Image
          src="/images/logo.png"
          alt="Logo image"
          width={256}
          height={256}
        />
      </div>
      <div>
        <button
          onClick={() => {
            window.ipc.send("message", "Hello");
          }}
        >
          Test IPC
        </button>
        <p className={`${styles.message}`}>{message}</p>
        <Link href={"/profil"}>
          <label htmlFor="">Profil</label>
        </Link>
      </div>
    </React.Fragment>
  );
}
