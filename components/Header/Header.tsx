'use client';
import styles from "./Header.module.scss"
import Image from "next/image";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Header() {
    return <header className={styles.header}>
        <div className={styles.headerWrapper}>
            {/* Logo */}
            <Image src="/is-the-game-good-high-resolution-logo-transparent.png"
            width={225}
            height={40}
            alt="Logo with controller icon"
            />

            {/* Nav */}
            <div className={styles.navContainer}>                
            {/* Header Search Bar */}
            <nav className={styles.navBar}>
                <a href="#" className={styles.navLink}>Home</a>
                <a href="#" className={styles.navLink}>Games</a>
                <a href="#" className={styles.navLink}>Sign Up</a>
            </nav>
            <nav className={styles.mobileNav}>
                <GiHamburgerMenu className={styles.mobileNavIcon} />
                <div className={styles.mobileNavLinks}>
                    <a href="#"  className={styles.navLink}>Home</a>
                    <a href="#"  className={styles.navLink}>Games</a>
                    <a href="#"  className={styles.navLink}>Signup</a>
                </div>
            </nav>
            <form onSubmit={event => event.preventDefault()} className={styles.gameSearch}>
                <input type="text" className={styles.gameSearchInput} placeholder="Search Games"></input>
                <button type="submit" className={styles.gameSearchButton}>Search</button>
            </form>
            </div>
        </div>
    </header>
}


