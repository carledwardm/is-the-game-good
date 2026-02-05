"use client";
import styles from "./Header.module.scss"
import Image from "next/image";
import Link from 'next/link';
import { GiHamburgerMenu } from "react-icons/gi";
import { FaSearch } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { signOut } from "firebase/auth"; 
import { auth } from "@/lib/firebaseConfig";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from 'next/navigation';



export default function Header() {
    // To render mobile nav
    const [showMobileNav, setShowMobileNav] = useState(false);
    const [showMobileSearch, setShowMobileSearch] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLDivElement>(null);
    const menuButtonRef = useRef<HTMLButtonElement>(null);
    const searchButtonRef = useRef<HTMLButtonElement>(null);
    const [ searchInput, setSearchInput ] = useState<string>("");
    const { user, loading } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        await signOut(auth);
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
        document.addEventListener("click", handleOutsideSearchClick);
        return () => document.removeEventListener("click", handleOutsideSearchClick);
    }, []);

    const submitSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchInput === "") {
            return;
        }
        // Space in regex matters, counts as a character
        const normalizedInput = searchInput.replace(/[^a-zA-Z0-9 ]/g, '').toLowerCase();
        router.push(`/games/?search=${normalizedInput}`);
    }

    return <header className={styles.header}>
        <div className={styles.headerWrapper}>
            {/* Logo */}
            <Link href="/" aria-label="Go to home page">
            <Image src="/logo.png"
            width={225}
            height={40}
            alt="Logo with controller icon"
            className={styles.logo}
            priority
            />
            </Link>

            {/* Nav and Search Container */}
            <div className={styles.navSearchContainer}>                
            {/* Nav */}
            <nav className={styles.navBar} aria-label="Main nav">
                <Link href="/" className={styles.navLink}>Home</Link>
                <Link href={`/games`} className={styles.navLink}>Games</Link>
                {!loading && (!user ? (<Link href="/login" className={styles.navLink}>Log In</Link>) : (<Link href="/login" className={styles.navLink} onClick={handleLogout}>Log Out</Link>))}
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
                    <hr className={styles.mobileNavDivider}/>
                    <Link href="/"  className={styles.navLinkMobile}><span className={styles.mobileNavLinkText}>Home</span></Link>
                    <hr className={styles.mobileNavDivider}/>
                    <Link href={`/games`} className={styles.navLinkMobile}><span className={styles.mobileNavLinkText}>Games</span></Link>
                    <hr className={styles.mobileNavDivider}/>
                    {!user ? (<Link href="/login" className={styles.navLinkMobile}><span className={styles.mobileNavLinkText}>Log In</span></Link>) : (<Link href="/login" className={styles.navLinkMobile} onClick={handleLogout}><span className={styles.mobileNavLinkText}>Log Out</span></Link>)}
                </div>
            </nav>
            {/* Search Form*/}
            <form onSubmit={submitSearch} className={styles.gameSearch}>
                <input 
                    type="text" 
                    className={styles.gameSearchInput} 
                    placeholder="Search Games" 
                    aria-label="Search games"
                    onChange={(e) => setSearchInput(e.target.value)}
                    value={searchInput}
                ></input>
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
                            <form onSubmit={submitSearch} className={styles.gameSearchMobileForm}>
                                <input 
                                    type="text" 
                                    className={styles.gameSearchInputMobile} 
                                    placeholder="Search Games" 
                                    aria-label="Search games"
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    value={searchInput}
                                ></input>
                                <button type="submit" className={styles.gameSearchButtonMobile}>Search</button>
                            </form>
                        </div>
            </div>
            </div>
        </div>
    </header>
}


