"use client";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./games.module.scss";
import { collection, DocumentData, DocumentSnapshot, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import Toast from "@/components/Toast";
import GameComp from "@/components/games/gameComp";

export default function Games() {
    const searchParams = useSearchParams();
    const [ games, setGames ] = useState<DocumentSnapshot<DocumentData>[]>([]);
    const [ showToast, setShowToast ] = useState<boolean>(false);
    const [ toastMessage, setToastMessage ] = useState<string>("");
    const searchString = searchParams.get('search');

    const fetchGames = async () => {
            try {
                // Keyword search
                let games: DocumentSnapshot<DocumentData>[]  = [];
                if (searchString) {
                    const stopWords = ["a", "i", "an", "the", "of", "to", "in", "on", "or"];
                    const stringArray: string[] = searchString.split(" ").filter(word => !stopWords.includes(word));
                    const q = query(collection(db, "games"), where("keywords", "array-contains-any", stringArray));
                    const querySnapshot = await getDocs(q);
                    querySnapshot.docs.forEach((game, index) => {
                        games.push(game);
                    }) 
                } else {
                    // Fetch all games
                    const querySnapshot = await getDocs(collection(db, "games"));
                    querySnapshot.docs.forEach((game, index) => {
                        games.push(game);
                    })
                }
                return games;
            }catch (error) {
                setShowToast(true);
                setToastMessage("No results found, please try again");
            }
        }

    function calculateWeighted(gameSnap: DocumentSnapshot<DocumentData>, averageOfAll: number) {
        const v = gameSnap.data()?.numReviews;
        const R = gameSnap.data()?.gameScore;
        const m = 10;
        const C = averageOfAll;
        if (v === 0) {
            return C;
        } 
        const weightedScore = (v / (v + m)) * R + (m / (v + m)) * C;
        return weightedScore;
    }

    useEffect(() => {  
        const fetchAndSortGames = async () => {
            const games = await fetchGames();
            if (!games) {
                return;
            }
            // Get everage score for all queried games for sorting
            let sumOfAllScores = 0;
            games.forEach((game) => sumOfAllScores += game.data()?.gameScore) 
            let averageOfAllScores = sumOfAllScores / games.length;
            const sortedGames = games.sort((a, b) => {
                return calculateWeighted(b, averageOfAllScores) - calculateWeighted(a, averageOfAllScores)
            })
            setGames(sortedGames);
        }
        fetchAndSortGames();
    }, [searchString]);

    return (
        <main className={styles.gamesMain}>
            <div className={styles.gamesContainer}>
                <h1 className={styles.gamesTitle}>{searchString ? "Search Results" : "All Games"}</h1>
                {games.map((game, index) => (
                    <GameComp gameSnap={game} key={index}/>
                ))}
            </div>

            {showToast && (
                <Toast 
                    message={toastMessage}
                    onClose={() => {
                        setToastMessage("");
                        setShowToast(false);
                    }}
                    duration={10000}
                />)
            }

        </main>
    )
}