"use client";
import styles from "./page.module.css";
import { useAuth } from "@/context/AuthContext"; 

export default function Home() {
  const { user } = useAuth();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {!user ? (
          <h1 className={styles.tempHeading}>Home Page</h1>
        ) : <h1 className={styles.tempHeading}>Welcome, {user.displayName}!</h1>}
      </main>
    </div>
  );
}
