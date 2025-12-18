"use client";
import styles from "./addGame.module.scss";
import { useState } from "react";

export default function addGameContainer() {
    const [gameTitle, setGameTitle] = useState<string>("");
    const [gameBoxArtFile, setGameBoxArtFile] = useState<File | null>(null)
    const [gameScreenShotFiles, setGameScreenShotFiles] = useState<FileList | null>(null)
    const handleGameSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(gameTitle);
        console.log(gameBoxArtFile);
        if (gameScreenShotFiles) {
            console.log(gameScreenShotFiles[0].name);
            console.log("first log");
            console.log(gameScreenShotFiles[1].name);
            console.log("second log");
        }
    }

    return (
        <main className={styles.addGameMain}>
            <div className={styles.addGameContainer}>
                <h1 className={styles.title}>Add Game (admin only)</h1>
                <form className={styles.form} onSubmit={handleGameSubmit}>
                    <label htmlFor="addGameTitleInput" className={styles.addGameLabel}>Game title</label>
                    <input id={styles.addGameTitleInput} type="text" area-label="Game title input" placeholder="Enter title" onChange={(e) => setGameTitle(e.target.value)}></input> 
                    <label htmlFor="addGameBoxArt" className={styles.addGameLabel}>Add box art file</label>
                    <input id={styles.addGameBoxArt}type="file" className={styles.addGameFileInput} accept=".jpg, .jpeg, .png" onChange={(e) => setGameBoxArtFile(e.target.files?.[0] ?? null)}></input>
                    <label htmlFor="addGameTitleInput" className={styles.addGameLabel}>Add game screenshots</label>
                    <input type="file" className={styles.addGameFileInput} accept=".jpg, .jpeg, .png" onChange={(e) => setGameScreenShotFiles(e.target.files ?? null)} multiple></input>
                    <button type="submit" className={styles.addGameButton}>Submit game</button>
                </form>
            </div>
        </main>
    )
}