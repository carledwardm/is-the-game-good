"use client";
import styles from "./addGame.module.scss";
import { useEffect, useState } from "react";

export default function addGameContainer() {
    const [gameTitle, setGameTitle] = useState<string>("");
    const [gameBoxArtFile, setGameBoxArtFile] = useState<File | null>(null)
    const [gameScreenShotFiles, setGameScreenShotFiles] = useState<File[]>([])

    const handleGameSubmit = (e: React.FormEvent) => {
        e.preventDefault();
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
                    <input 
                    type="file" 
                    className={styles.addGameFileInput} 
                    accept=".jpg, .jpeg, .png" 
                    onChange={(e) => {
                                    const screenShots = Array.from(gameScreenShotFiles);
                                    if (!e.target.files || e.target.files.length === 0) {
                                        return;
                                    }
                                    if (e.target.files && e.target.files.length === 1) {
                                        screenShots.push(e.target.files[0]);
                                    } 
                                    if (e.target.files && e.target.files.length > 1) {
                                        for (let i = 0; i < e.target.files.length; i++) {
                                            screenShots.push(e.target.files[i]);
                                        }
                                    }
                                    setGameScreenShotFiles(screenShots);
                                    }} multiple></input>
                    <div className={styles.fileNameContainer}>
                        {
                            gameScreenShotFiles.map((file, index) => (
                                <p key={index} className={styles.fileName}>{file.name}</p>
                            ))
                        }
                    </div>
                    <button type="submit" className={styles.addGameButton}>Submit game</button>
                </form>
            </div>
        </main>
    )
}