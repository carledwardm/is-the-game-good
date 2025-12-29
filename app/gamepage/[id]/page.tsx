"use client";
import styles from "../GamePage.module.scss";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import * as React from "react";
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import Image from "next/image";
import EmblaCarousel from "@/components/GamePage/Carousel";

export default function gamePage({params}: any) {
    const { id } = React.use(params) as any;
    const router = useRouter();
    const [game, setGame] = useState<any>(null);
    const [slides, setSlides] = useState<string[]>([])

    useEffect(() => {
        const fetchGame = async () => {
            try {
                const docRef = doc(db, "games", id);
                const docSnap = await getDoc(docRef);
                setGame(docSnap.data());
                console.log(docSnap.data());
                } catch (error) {
                    console.log("error");
                    router.push("/");
                }
            }
        fetchGame();
        }, [])

    useEffect(() => {
        if (game?.screenshots) {
        setSlides(game.screenshots.slice(0, 10) || []);
        }
    }, [game])

    return (
    <main className={styles.gamePageMain}>
        <section className={styles.gameHeroSection}>
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
            <p className={styles.releaseDate}>{game ? game.first_release_date : ""}</p>
        </section>
        <section className={styles.screenshotContainer}>
            {game ? <EmblaCarousel slides={slides.map((slide, index) => index)} gameScreenshots={slides}/> : ""}
        </section>
    </main>
    )
}