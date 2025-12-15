'use client';
import styles from "./Header.module.scss"
import Image from "next/image";
import Link from 'next/link';
import { GiHamburgerMenu } from "react-icons/gi";
import { FaSearch } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";


export default function Header() {
    // To render mobile nav
    const [showMobileNav, setShowMobileNav] = useState(false);
    const [showMobileSearch, setShowMobileSearch] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLDivElement>(null);
    const menuButtonRef = useRef<HTMLDivElement>(null);
    const searchButtonRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (
                (menuRef.current && !menuRef.current.contains(event.target as Node))
                 && (menuButtonRef.current && !menuButtonRef.current.contains(event.target as Node))
                ) {
                setShowMobileNav(false);
            }
        };

        document.addEventListener("click", handleOutsideClick);
        return () => document.removeEventListener("click", handleOutsideClick);
    }, []);

    useEffect(() => {
        const handleOutsideSearchClick = (event: MouseEvent) => {
            if (
                (searchRef.current && !searchRef.current.contains(event.target as Node))
                 && (searchButtonRef.current && !searchButtonRef.current.contains(event.target as Node))
                ) {
                setShowMobileSearch(false);
            }
        };
        console.log("adding listener");
        document.addEventListener("click", handleOutsideSearchClick);
        return () => document.removeEventListener("click", handleOutsideSearchClick);
    }, []);

    return <header className={styles.header}>
        <div className={styles.headerWrapper}>
            {/* Logo */}
            <Link href="/">
            <Image src="/is-the-game-good-high-resolution-logo-transparent.png"
            width={225}
            height={40}
            alt="Logo with controller icon"
            className={styles.logo}
            />
            </Link>

            {/* Nav and Search Container */}
            <div className={styles.navSearchContainer}>                
            {/* Nav */}
            <nav className={styles.navBar}>
                <Link href="#" className={styles.navLink}>Home</Link>
                <Link href="#" className={styles.navLink}>Games</Link>
                <Link href="#" className={styles.navLink}>Sign Up</Link>
            </nav>
            {/* Mobile Nav */}
            
            <nav className={styles.mobileNav} ref={menuButtonRef}>
                <GiHamburgerMenu className={styles.mobileNavIcon} onClick={() => {
                if (showMobileNav === false) {
                    setShowMobileNav(true);
                } else {
                    setShowMobileNav(false);
                }
            }}/>
                <div className={`${styles.mobileNavLinks} ${showMobileNav? styles.show : ""}`} ref={menuRef}>
                    <Link href="#"  className={styles.navLinkMobile}><span className={styles.mobileNavLinkText}>Home</span></Link>
                    <hr className={styles.mobileNavDivider}/>
                    <Link href="#"  className={styles.navLinkMobile}><span className={styles.mobileNavLinkText}>Games</span></Link>
                    <hr className={styles.mobileNavDivider}/>
                    <Link href="#"  className={styles.navLinkMobile}><span className={styles.mobileNavLinkText}>Signup</span></Link>
                </div>
            </nav>
            {/* Search Form*/}
            <form onSubmit={event => event.preventDefault()} className={styles.gameSearch}>
                <input type="text" className={styles.gameSearchInput} placeholder="Search Games"></input>
                <button type="submit" className={styles.gameSearchButton}>Search</button>
            </form>
            {/* Mobile Search Form */}
            <nav className={styles.mobileSearch} ref={searchButtonRef}>
                <FaSearch className={styles.searchIcon} onClick={() => {
                    if (showMobileSearch === false) {
                        setShowMobileSearch(true)
                    } else {
                        setShowMobileSearch(false);
                    }
                }}/>
                <div className={`${styles.gameSearchMobileContainer} ${showMobileSearch? styles.show : ""}`} ref={searchRef}>
                    <form onSubmit={event => event.preventDefault()} className={styles.gameSearchMobileForm}>
                        <input type="text" className={styles.gameSearchInputMobile} placeholder="Search Games"></input>
                        <button type="submit" className={styles.gameSearchButtonMobile}>Search</button>
                    </form>
                </div>
            </nav>
            </div>
        </div>
    </header>
}


