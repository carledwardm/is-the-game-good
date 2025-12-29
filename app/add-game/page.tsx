"use client";
import styles from "./addGame.module.scss";
import { useState } from "react";
import Toast from "@/components/Toast";
import Image from "next/image";
import { MdDelete } from "react-icons/md";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";


// *** SET UP IGDB API ROUTE - ADD GAME PAGE LIKELY NOT NECESSARY ***

export default function addGameContainer() {
    const [gameTitle, setGameTitle] = useState<string>("");
    const [gameData, setGameData] = useState<gameProps[]>([]);
    const [gameSearchLimit, setGameSearchLimit] = useState<number>(1);
    const [showToast, setShowToast] = useState<boolean>(false);
    const [toastMessage, setToastMessage] = useState<string>("");

    interface Media {
        id: number;
        url: string;
    }
    
    interface gameProps {
    id: number;
    artworks: Media[];
    first_release_date: number;
    name: string;
    screenshots: Media[];
}

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
            let games = [];
            for (let i = 0; i < data.length; i++) {
                console.log(data[i]);
                games.push(data[i]);
            }
            console.log(games);
            setGameData(games);
        } catch (error) {
            console.log(error);
        }
    }

    // Delete game data before saving to database
    const deleteGameCard = (game: gameProps) => {
        const newGameData = (gameData.filter(g => g.id !== game.id));
        setGameData(newGameData);
    }

    // Save game data to database - if there is an error, prompt says to check DB since other entries may succeed
    const saveGameSearch = async () => {
        let errorOccurred = false;
        for (let i = 0; i < gameData.length; i++) {
            let game = gameData[i];
                if (game.artworks?.[0] && game.screenshots?.[0]) {
                    try {
                        await setDoc(doc(db, "games", String(game.id)), {
                        name: game.name,
                        artwork: convertArtUrl(game.artworks[0].url),
                        first_release_date: convertDate(game.first_release_date),
                        screenshots: game.screenshots.map(game => convertSCUrl(game.url)),
                        });
                    } catch (error) {
                        error = true;
                    }
                } 
            }
        if (errorOccurred) {
            setToastMessage("There was an error saving data, please review submissions in database.");
            setShowToast(true);
        } else {
            setToastMessage("Data successfully saved.");
            setShowToast(true);
        }
    }  

    // Converts unix time stamp dates 
    const convertDate = (unixTimeStamp: number) => {
        const gameDate = new Date(unixTimeStamp * 1000)
        .toLocaleString("en-US", {
                            timeZone: "UTC",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        });
        return gameDate;
    }

    // Converts artwork url from thumbnail to larger size
    const convertArtUrl = (url: string) => {
        const newUrl = url.replace("t_thumb", "t_cover_big");
        return newUrl;
    }

        // Converts screenshot url from thumbnail to larger size
    const convertSCUrl = (url: string) => {
        const newUrl = url.replace("t_thumb", "t_screenshot_big");
        return newUrl;
    }


    return (
        <main className={styles.addGameMain}>
            <div className={styles.addGameContainer}>
                <h1 className={styles.title}>Add Games (admin only)</h1>
                <form className={styles.form} onSubmit={handleGameSearch}>
                    <label htmlFor="addGameTitleInput" className={styles.searchGameLabel}>Game title</label>
                    <input id={styles.searchGameTitleInput} type="text" area-label="Game title input" placeholder="Enter title" onChange={(e) => setGameTitle(e.target.value)}></input> 
                    <label htmlFor="searchLimitInput" className={styles.searchGameLabel}>Search Limit</label>
                    <input id={styles.searchLimitInput} 
                        type="number" 
                        min={1} 
                        max={50} 
                        step={1} 
                        value={gameSearchLimit} 
                        onChange={(e) => {
                            const value = parseInt(e.target.value);
                            setGameSearchLimit(isNaN(value) ? 1 : value);    
                        }}/>   
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
            <div className={styles.gameDataContainer}>
                <ul className={styles.gameData}>
                    { gameData.map((game, index) => (
                        game.artworks?.[0]?.url && game.screenshots?.[0]?.url && (
                        <li key={index} className={styles.gameCard}>
                                <div className={styles.deleteRow}><MdDelete className={styles.deleteIcon} onClick={() => deleteGameCard(game)}/></div>
                                <div className={styles.gameInfo}>
                                    <h2 className={styles.gameTitle}>{game.name}</h2>
                                    <p className={styles.gameRelease}>{convertDate(game.first_release_date)}</p>
                                </div>
                                <div className={styles.gameArtBox}>
                                    <Image 
                                    className={styles.gameArt} 
                                    src={`https:${convertArtUrl(game.artworks[0].url)}`}
                                    fill
                                    alt={`${game.name} artwork`}
                                />     
                                </div>
                        </li>
                        )
                    ))
                    }
                </ul>
                <div className={styles.saveButtonContainer}>
                    <button type="submit" className={styles.saveButton} onClick={saveGameSearch} disabled={gameData.length === 0}>Save Results</button>
                    </div>
            </div>
        </main>
    )
}