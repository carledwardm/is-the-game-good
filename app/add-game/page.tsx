"use client";
import styles from "./addGame.module.scss";
import { useState } from "react";
import Toast from "@/components/Toast";
import Image from "next/image";
import { MdDelete } from "react-icons/md";


// *** SET UP IGDB API ROUTE - ADD GAME PAGE LIKELY NOT NECESSARY ***

export default function addGameContainer() {
    const [gameTitle, setGameTitle] = useState<string>("");
    const [gameBoxArtURL, setGameBoxArtURL] = useState<string>("");
    const [gameScreenShotURLs, setGameScreenShotURLs] = useState<string[]>([]);
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

    const deleteGameCard = (game: gameProps) => {
        const newGameData = (gameData.filter(g => g.id !== game.id));
        setGameData(newGameData);
    }

    const saveGameSearch = () => {
        console.log("Saving game data!");
        console.log(gameData);
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
                        game.artworks?.[0]?.url && (
                        <li key={index} className={styles.gameCard}>
                                <div className={styles.deleteRow}><MdDelete className={styles.deleteIcon} onClick={() => deleteGameCard(game)}/></div>
                                <div className={styles.gameInfo}>
                                    <h2 className={styles.gameTitle}>{game.name}</h2>
                                    <p className={styles.gameRelease}>{
                                        new Date(game.first_release_date * 1000).toLocaleString("en-US", {
                                            timeZone: "UTC",
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}</p>
                                </div>
                                <div className={styles.gameArtBox}>
                                    <Image 
                                    className={styles.gameArt} 
                                    src={`https:${game.artworks[0].url.replace("t_thumb", "t_cover_big")}`}
                                    fill
                                    alt={`${game.name} artwork`}
                                />     
                                </div>
                        </li>
                        )
                    ))
                    }
                </ul>
                <button type="submit" className={styles.saveButton} onClick={saveGameSearch}>Save Results</button>
            </div>
        </main>
    )
}