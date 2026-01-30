"use client"
import { collection, DocumentData, DocumentSnapshot, getDocs } from "firebase/firestore";
import styles from "./TopGames.module.scss";
import { db } from "@/lib/firebaseConfig";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function TopGames() {
    const [ games, setGames ] = useState<DocumentSnapshot<DocumentData>[]>([])

    // Grab games, sort by score so top 3 can be referenced
    useEffect(() => {
        const fetchGames = async () => {
            const gamesCol = collection(db, "games");
            const gamesSnap = await getDocs(gamesCol)
            const games: DocumentSnapshot<DocumentData>[] = [];
            gamesSnap.forEach((game) => {
                games.push(game);   
            })
            const totalScore = games.reduce((sum, game) => sum + (game.data()!.gameScore || 0), 0);
            const averageScore = totalScore / games.length;
            const sortedGames = games.sort((a, b) => {
                    return calculateWeighted(b, averageScore) - calculateWeighted(a, averageScore)
            })
            setGames(sortedGames);
        }
    fetchGames();
    }, [])

    function calculateWeighted(gameSnap: DocumentSnapshot<DocumentData>, averageScore: number) {
            const v = gameSnap.data()?.numReviews;
            const R = gameSnap.data()?.gameScore;
            const m = 10;
            const C = averageScore;
            if (v === 0) {
                return C;
            } 
            const weightedScore = (v / (v + m)) * R + (m / (v + m)) * C;
            return weightedScore;
    }

    return (
        <section className={styles.topGamesSection}>
            <div className={styles.topGamesTextContainer}>
                <h2 className={styles.topGamesTitle}>Check out our top 3 reviewed titles!</h2>
            </div>
            <div className={styles.topGames}>
                { games.map((game, index) => (
                    index < 3 && 
                    (
                        <a 
                        className={styles.wrapperLink} 
                        href={`/game-page/${game.id}`} 
                        aria-label={`Link to ${game.data()?.gameName ?? 'game'} info page`} 
                        key={index}>
                            <div className={styles.game}>
                                <div className={styles.gameArt}>
                                    <Image 
                                        src={`https:${game.data()?.artwork}`}
                                        alt={`${game.data()?.name} artwork`}
                                        fill
                                        sizes="width: 100%"
                                    />
                                </div>
                                <h3 className={styles.gameTitle}>{game.data()?.name}</h3>
                            </div>
                        </a>
                    )
                )) 
                }
            </div>
        </section>
    )
}