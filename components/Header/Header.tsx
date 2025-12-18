'use client';
import styles from "./Header.module.scss"
import Image from "next/image";
import Link from 'next/link';
import { GiHamburgerMenu } from "react-icons/gi";
import { FaSearch } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { onAuthStateChanged, User, signOut } from "firebase/auth"; 
import { auth } from "@/lib/firebaseConfig";


export default function Header() {
    // To render mobile nav
    const [showMobileNav, setShowMobileNav] = useState(false);
    const [showMobileSearch, setShowMobileSearch] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLDivElement>(null);
    const menuButtonRef = useRef<HTMLButtonElement>(null);
    const searchButtonRef = useRef<HTMLButtonElement>(null);
    const [user, setUser] = useState<User | null>(null);

    const handleLogout = async () => {
        await signOut(auth);
        setUser(null);
    }
    
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

    // For dynamic logout/login links
    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    })
    return () => unsubscribe();
  }, [])

    return <header className={styles.header}>
        <div className={styles.headerWrapper}>
            {/* Logo */}
            <Link href="/" aria-label="Go to home page">
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
            <nav className={styles.navBar} aria-label="Main nav">
                <Link href="#" className={styles.navLink}>Home</Link>
                <Link href="#" className={styles.navLink}>Games</Link>
                {!user ? (<Link href="/login" className={styles.navLink}>Log In</Link>) : (<Link href="/login" className={styles.navLink} onClick={handleLogout}>Log Out</Link>)}
            </nav>
            {/* Mobile Nav */}
            
            <nav className={styles.mobileNav} aria-label="Main nav">
                <button
                    type="button"
                    className={styles.mobileNavToggleButton}
                    aria-label="Mobile nav toggle"
                    aria-expanded={showMobileNav}
                    ref={menuButtonRef} 
                    onClick={() => {
                        if (showMobileNav === false) {
                            setShowMobileNav(true);
                        } else {
                            setShowMobileNav(false);
                        }
                    }}>
                <GiHamburgerMenu className={styles.mobileNavIcon} aria-hidden="true" /></button>
                <div className={`${styles.mobileNavLinks} ${showMobileNav? styles.show : ""}`} ref={menuRef}>
                    <Link href="#"  className={styles.navLinkMobile}><span className={styles.mobileNavLinkText}>Home</span></Link>
                    <hr className={styles.mobileNavDivider}/>
                    <Link href="#"  className={styles.navLinkMobile}><span className={styles.mobileNavLinkText}>Games</span></Link>
                    <hr className={styles.mobileNavDivider}/>
                    {!user ? (<Link href="/login" className={styles.navLinkMobile}><span className={styles.mobileNavLinkText}>Log In</span></Link>) : (<Link href="/login" className={styles.navLinkMobile} onClick={handleLogout}><span className={styles.mobileNavLinkText}>Log Out</span></Link>)}
                </div>
            </nav>
            {/* Search Form*/}
            <form onSubmit={event => event.preventDefault()} className={styles.gameSearch}>
                <input type="text" className={styles.gameSearchInput} placeholder="Search Games" aria-label="Search games"></input>
                <button type="submit" className={styles.gameSearchButton}>Search</button>
            </form>
            {/* Mobile Search Form */}
            <div className={styles.mobileSearch}>
                <button 
                className={styles.mobileSearchToggleButton}
                type="button"
                aria-label="Mobile search toggle"
                aria-expanded={showMobileSearch}
                ref={searchButtonRef}
                onClick={() => {
                    if (showMobileSearch === false) {
                        setShowMobileSearch(true)
                    } else {
                        setShowMobileSearch(false);
                    }
                }}>
                    <FaSearch className={styles.searchIcon} aria-hidden="true"/></button>
                        <div className={`${styles.gameSearchMobileContainer} ${showMobileSearch? styles.show : ""}`} ref={searchRef}>
                            <form onSubmit={event => event.preventDefault()} className={styles.gameSearchMobileForm}>
                                <input type="text" className={styles.gameSearchInputMobile} placeholder="Search Games" aria-label="Search games"></input>
                                <button type="submit" className={styles.gameSearchButtonMobile}>Search</button>
                            </form>
                        </div>
            </div>
            </div>
        </div>
    </header>
}


