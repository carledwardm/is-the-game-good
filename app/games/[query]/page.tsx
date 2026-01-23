"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import styles from "../games.module.scss";

export default function Games() {
    const pathname = usePathname();

    useEffect(() => {
        const queryString = pathname.split("/").pop();
        if (queryString === "all-games") {
            console.log("All games will display");
        } else {
            console.log(`Searching for ${queryString}`);
        }
    }, []);

    return (
        <main className={styles.gamesMain}>
            <div className={styles.gamesContainer}>
                <h1 className={styles.gamesTitle}>Games will display hereeeee!</h1>
            </div>
        </main>
    )
}