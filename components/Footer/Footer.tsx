import styles from './Footer.module.scss';
import Image from "next/image";
import Link from "next/link";

function footer() {
    return <footer className={styles.footer}>
        <div className={styles.footerTopRow}>
        <Link href="/">
            <Image src="/is-the-game-good-high-resolution-logo-transparent.png"
                width={225}
                height={40}
                alt="Logo with controller icon"
                className={styles.logo}
                />
        </Link>
            <nav className={styles.footerNav}>
                <Link href="#" className={styles.footerNavLink}>Home</Link>
                <Link href="#" className={styles.footerNavLink}>Games</Link>
                <Link href="#" className={styles.footerNavLink}>Sign Up</Link>
            </nav>
        </div>
        <div className={styles.footerBottomRow}>
            <p className={styles.footerCopyright}>© Copyright Carl Millard {new Date().getFullYear()}. All rights reserved.
            </p>
        </div>
    </footer>
}

export default footer;