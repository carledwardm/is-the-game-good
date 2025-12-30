"use client"
import styles from './Footer.module.scss';
import Image from "next/image";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";
import { useAuth } from "@/context/AuthContext";

function footer() {
    const { user, loading } = useAuth();

    const handleLogout = async () => {
    await signOut(auth);
    }

    return <footer className={styles.footer}>
        <div className={styles.footerTopRow}>
        <Link href="/" aria-label="Go to home page">
            <Image src="/logo.png"
                width={225}
                height={40}
                alt="Logo with controller icon"
                className={styles.logo}
                />
        </Link>
            <nav className={styles.footerNav} aria-label="Footer nav">
                <Link href="/" className={styles.footerNavLink}>Home</Link>
                <Link href="#" className={styles.footerNavLink}>Games</Link>
                {!loading && (!user ? (<Link href="/login" className={styles.footerNavLink}>Log In</Link>) : (<Link href="/login" className={styles.footerNavLink} onClick={handleLogout}>Log Out</Link>))}
            </nav>
        </div>
        <div className={styles.footerBottomRow}>
            <p className={styles.footerCopyright}>© Copyright Carl Millard {new Date().getFullYear()}. All rights reserved.
            </p>
        </div>
    </footer>
}

export default footer;