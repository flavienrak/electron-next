import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import { useState } from "react";

export default function HomePage() {
  const [message, setMessage] = useState("No message found");

  return (
    <>
      <Head>
        <title>Home - Nextron (basic-lang-javascript)</title>

      </Head>
      <div>
        <p>
          ⚡ Electron + Next.js ⚡ - <Link href="/next">Go to next page</Link>
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
        <p>{message}</p>
      </div>
    </>
  );
}
