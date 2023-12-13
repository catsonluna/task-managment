import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Header from "./components/header";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <><Header />
      <main className={`${styles.main}`}>
      <div className={styles.description3}>
       <h1> Task Management!</h1></div>
        <div className={styles.description}>
          <div className={styles.description1}>
            <h1>
              We are a website based entirely around keeping track of your work!
              We want to ensure an easy and simple experience when it comes to
              creating tasks, getting reminders for them, and much more! Please
              take a loot at the rest of the website to see all of the
              possibilities we have to offer!
            </h1>
          </div>
          <div className={styles.description2}>
            <h2>
              Please leave any suggestions in one of the following emails.
            </h2>
            <h2>ipb21.j.disereits@vtdt.edu.lv</h2>
            <h2>ipb21.e.berzons@vtdt.edu.lv</h2>
            <h2>ipb21.k.voss@vtdt.edu.lv</h2>
          </div>
        </div>
      </main>
    </>
  );
}
