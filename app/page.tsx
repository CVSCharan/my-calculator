import Image from "next/image";
import styles from "./page.module.css";
import Head from "next/head";
import Calculator from "./components/Calculator";

export default function Home() {
  return (
    <main className={styles.main}>
      <Head>
        <title>Calculator</title>
        <meta
          name="description"
          content="A simple calculator built with Next.js"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h2 className={styles.heading}>Calculator</h2>
      <Calculator />
    </main>
  );
}
