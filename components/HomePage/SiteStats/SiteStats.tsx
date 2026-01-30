import styles from "./SiteStats.module.scss";

export default function SiteStats() {
    return (
        <section className={styles.statsSection}>
            <div className={styles.statsTextContainer}>
                <h2 className={styles.statsTitle}>Our Current Score</h2>
                <p className={styles.statsText}>Check out our user and review counts below!</p>
            </div>
            <div className={styles.statsContainer}>
                <div className={styles.stat}>
                    <p className={styles.number}></p>
                    <p className={styles.numberText}></p>
                </div>
                <div className={styles.stat}>
                    <p className={styles.number}></p>
                    <p className={styles.numberText}></p>
                </div>
                <div className={styles.stat}>
                    <p className={styles.number}></p>
                    <p className={styles.numberText}></p>
                </div>
            </div>
        </section>
    )
}