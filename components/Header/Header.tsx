import styles from "./Header.module.scss"
import Image from "next/image";

export default function Header() {
    return <header className={styles.header}>
        <Image src="/is-the-game-good-high-resolution-logo-transparent.png"
        width={225}
        height={40}
        alt="Logo with controller icon"
         />
    </header>
}


