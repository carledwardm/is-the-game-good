import styles from "./games.module.scss";

export default function games() {
    return (
        <main className={styles.gamesMain}>
            <div className={styles.gamesContainer}>
                <h1 className={styles.gamesTitle}>Games will display hereeeee!</h1>
            </div>
        </main>
    )
}