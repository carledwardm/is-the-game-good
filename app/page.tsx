"use client";
import styles from "./page.module.css";
import { useAuth } from "@/context/AuthContext"; 

export default function Home() {
  const { user, loading } = useAuth();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {!loading ? (!user ? (
          <h1 className={styles.tempHeading}>Home Page</h1>
        ) : <h1 className={styles.tempHeading}>Welcome, {user.displayName}!</h1>) : <h1 className={styles.tempHeading}>Loading...</h1>}
      </main>
    </div>
  );
}
