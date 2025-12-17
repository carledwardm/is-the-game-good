"use client";
import styles from "./page.module.css";
import { auth } from "@/lib/firebaseConfig";
import { useEffect, useState } from "react"
import { onAuthStateChanged, User } from "firebase/auth"; 

export default function Home() {
  const [ user, setUser ] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    })
    return () => unsubscribe();
  }, [])

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
