"use client";
import styles from "./addGame.module.scss";
import { useState } from "react";


// *** SET UP IGDB API ROUTE - ADD GAME PAGE LIKELY NOT NECESSARY ***

export default function addGameContainer() {
    const [gameTitle, setGameTitle] = useState<string>("");
    const [gameBoxArtURL, setGameBoxArtURL] = useState<string>("")
    const [gameScreenShotURLs, setGameScreenShotURLs] = useState<string[]>([])
    const [gameSearchLimit, setGameSearchLimit] = useState<number>(5)

    const handleGameSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(gameTitle)
        console.log(`Will search for ${gameSearchLimit} titles.` )
    }

    return (
        <main className={styles.addGameMain}>
            <div className={styles.addGameContainer}>
                <h1 className={styles.title}>Add Game (admin only)</h1>
                <form className={styles.form} onSubmit={handleGameSubmit}>
                    <label htmlFor="addGameTitleInput" className={styles.searchGameLabel}>Game title</label>
                    <input id={styles.searchGameTitleInput} type="text" area-label="Game title input" placeholder="Enter title" onChange={(e) => setGameTitle(e.target.value)}></input> 
                    <label htmlFor="searchLimitInput" className={styles.searchGameLabel}>Search Limit</label>
                    <input id={styles.searchLimitInput} type="number" min={5} max={50} step={5} value={gameSearchLimit} onChange={(e) => setGameSearchLimit(parseInt(e.target.value))}/>   
                    <button type="submit" className={styles.searchGameButton}>Submit Search</button>
                </form>
            </div>
        </main>
    )
}