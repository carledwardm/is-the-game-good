"use client";
import styles from "../GamePage.module.scss";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import * as React from "react";
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import Image from "next/image";


export default function gamePage({params}: any) {
    const { id } = React.use(params) as any;
    const router = useRouter();
    const [game, setGame] = useState<any>(null);

    useEffect(() => {
        const fetchGame = async () => {
            try {
                const docRef = doc(db, "games", id);
                const docSnap = await getDoc(docRef);
                console.log("found game");
                setGame(docSnap.data());
                } catch (error) {
                    console.log("error");
                    router.push("/");
                }
            }
        fetchGame();
        }, [])
    if (game) {
        console.log(game);
        console.log(game.name);
    }
    return (
    <main className={styles.gamePageMain}>
        <div className={styles.gameHeroSection}>
            {game && <div className={styles.gameArtBox}>
                       <Image 
                         className={styles.gameArt} 
                         src={`https:${game.artwork.replace("t_cover_big", "t_screenshot_big")}`}
                         fill
                         alt={`${game.name} artwork`}
                       />     
                     </div>
            }
            <h1 className={styles.gameTitle}>{game ? game.name : "Loading..."}</h1>
        </div>
    </main>
    )
}