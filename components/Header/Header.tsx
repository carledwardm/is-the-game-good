'use client';
import styles from "./Header.module.scss"
import Image from "next/image";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaSearch } from "react-icons/fa";


export default function Header() {
    return <header className={styles.header}>
        <div className={styles.headerWrapper}>
            {/* Logo */}
            <Image src="/is-the-game-good-high-resolution-logo-transparent.png"
            width={225}
            height={40}
            alt="Logo with controller icon"
            className={styles.logo}
            />

            {/* Nav and Search Container */}
            <div className={styles.navSearchContainer}>                
            {/* Nav */}
            <nav className={styles.navBar}>
                <a href="#" className={styles.navLink}>Home</a>
                <a href="#" className={styles.navLink}>Games</a>
                <a href="#" className={styles.navLink}>Sign Up</a>
            </nav>
            {/* Mobile Nav */}
            <GiHamburgerMenu className={styles.mobileNavIcon} />
            <nav className={styles.mobileNav}>
                <div className={`${styles.mobileNavLinks} ${styles.show}`}>
                    <a href="#"  className={styles.navLinkMobile}>Home</a>
                    <hr className={styles.mobileNavDivider}/>
                    <a href="#"  className={styles.navLinkMobile}>Games</a>
                    <hr className={styles.mobileNavDivider}/>
                    <a href="#"  className={styles.navLinkMobile}>Signup</a>
                </div>
            </nav>
            {/* Search Form*/}
            <form onSubmit={event => event.preventDefault()} className={styles.gameSearch}>
                <input type="text" className={styles.gameSearchInput} placeholder="Search Games"></input>
                <button type="submit" className={styles.gameSearchButton}>Search</button>
            </form>
            {/* Mobile Search Form */}
            <FaSearch className={styles.searchIcon}/>
            <form onSubmit={event => event.preventDefault()} className={styles.gameSearchMobile}>
                <input type="text" className={styles.gameSearchInputMobile} placeholder="Search Games"></input>
                <button type="submit" className={styles.gameSearchButtonMobile}>Search</button>
            </form>
            </div>
        </div>
    </header>
}


