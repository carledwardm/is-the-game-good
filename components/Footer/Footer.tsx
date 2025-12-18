"use client"
import styles from './Footer.module.scss';
import Image from "next/image";
import Link from "next/link";
import { onAuthStateChanged, User, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebaseConfig";

function footer() {
    const [user, setUser] = useState<User | null>(null);

    const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, [])

    return <footer className={styles.footer}>
        <div className={styles.footerTopRow}>
        <Link href="/" aria-label="Go to home page">
            <Image src="/is-the-game-good-high-resolution-logo-transparent.png"
                width={225}
                height={40}
                alt="Logo with controller icon"
                className={styles.logo}
                />
        </Link>
            <nav className={styles.footerNav} aria-label="Footer nav">
                <Link href="/" className={styles.footerNavLink}>Home</Link>
                <Link href="#" className={styles.footerNavLink}>Games</Link>
                {!user ? (<Link href="/login" className={styles.footerNavLink}>Log In</Link>) : (<Link href="/login" className={styles.footerNavLink} onClick={handleLogout}>Log Out</Link>)}
            </nav>
        </div>
        <div className={styles.footerBottomRow}>
            <p className={styles.footerCopyright}>© Copyright Carl Millard {new Date().getFullYear()}. All rights reserved.
            </p>
        </div>
    </footer>
}

export default footer;