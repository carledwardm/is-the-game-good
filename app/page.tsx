import Image from "next/image";
import styles from "./page.module.css";
import Header from "../components/Header";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Header />
        <h1 className={styles.tempHeading}>Home Page</h1>
      </main>
    </div>
  );
}
