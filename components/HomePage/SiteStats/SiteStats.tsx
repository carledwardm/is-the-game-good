import styles from "./SiteStats.module.scss";
import { useEffect, useState } from "react";

export default function SiteStats() {
    const [ gameCount, setGameCount ] = useState<number>(0);
    const [ reviewCount, seReviewCount ] = useState<number>(0);
    const [ userCount, setUserCount ] = useState<number>(0);

    return (
        <section className={styles.statsSection}>
            <div className={styles.statsTextContainer}>
                <h2 className={styles.statsTitle}>Our Current Score</h2>
                <p className={styles.statsText}>Check out our user and review counts below!</p>
            </div>
            <div className={styles.statsContainer}>
                <div className={styles.stat}>
                    <p className={styles.number}>{gameCount}</p>
                    <p className={styles.numberText}>Games in database</p>
                </div>
                <div className={styles.stat}>
                    <p className={styles.number}>{reviewCount}</p>
                    <p className={styles.numberText}>Player Reviews</p>
                </div>
                <div className={styles.stat}>
                    <p className={styles.number}>{userCount}</p>
                    <p className={styles.numberText}>Users</p>
                </div>
            </div>
        </section>
    )
}