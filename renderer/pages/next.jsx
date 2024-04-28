import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/next.module.css'

export default function NextPage() {
  return (
    <React.Fragment>
      <Head>
        <title>Next</title>
      </Head>
      <div>
        <p className={`${styles.par}`}>
          ⚡ Electron + Next.js ⚡ - <Link href="/home">Go to home page</Link>
        </p>
      </div>
    </React.Fragment>
  )
}
