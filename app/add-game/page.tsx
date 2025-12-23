"use client";
import styles from "./addGame.module.scss";
import { useState } from "react";
import Toast from "@/components/Toast";


// *** SET UP IGDB API ROUTE - ADD GAME PAGE LIKELY NOT NECESSARY ***

export default function addGameContainer() {
    const [gameTitle, setGameTitle] = useState<string>("");
    const [gameBoxArtURL, setGameBoxArtURL] = useState<string>("");
    const [gameScreenShotURLs, setGameScreenShotURLs] = useState<string[]>([]);
    const [gameData, setGameData] = useState<string[]>([]);
    const [gameSearchLimit, setGameSearchLimit] = useState<number>(5);
    const [showToast, setShowToast] = useState<boolean>(false);
    const [toastMessage, setToastMessage] = useState<string>("");

    // Search for a specified number of games by title. Current limit is set to 50 from html number input below.
    const handleGameSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedTitle = gameTitle.trim();
        if (!gameTitle) {
            setShowToast(true);
            setToastMessage("A game title is required to complete a search.");
            return;
        }
        try {        
            const response = await fetch('/add-game/api', {
            method: "POST",
            body: JSON.stringify({
                gameTitle: trimmedTitle,
                gameSearchLimit: gameSearchLimit,
                })
            });
            const data = await response.json();
            if (!response.ok) {
                setShowToast(true);
                setToastMessage(data.error);
                return;
            }
            setShowToast(true);
            setToastMessage("Search complete, please view results before submitting.");
            for (let i = 0; i < data.length; i++) {
                console.log(data[i]);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <main className={styles.addGameMain}>
            <div className={styles.addGameContainer}>
                <h1 className={styles.title}>Add Games (admin only)</h1>
                <form className={styles.form} onSubmit={handleGameSearch}>
                    <label htmlFor="addGameTitleInput" className={styles.searchGameLabel}>Game title</label>
                    <input id={styles.searchGameTitleInput} type="text" area-label="Game title input" placeholder="Enter title" onChange={(e) => setGameTitle(e.target.value)}></input> 
                    <label htmlFor="searchLimitInput" className={styles.searchGameLabel}>Search Limit</label>
                    <input id={styles.searchLimitInput} type="number" min={5} max={50} step={5} value={gameSearchLimit} onChange={(e) => setGameSearchLimit(parseInt(e.target.value))}/>   
                    <button type="submit" className={styles.searchGameButton}>Submit Search</button>
                     {showToast && (
                        <Toast 
                        message={toastMessage}
                        onClose={() => {
                            setToastMessage("");
                            setShowToast(false);
                        }}/>
                    )}
                </form>
            </div>
        </main>
    )
}