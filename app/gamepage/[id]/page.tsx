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
                const response = await fetch(`/api/gamePage/${id}`);
                if (!response.ok) {
                    throw new Error("Game not found")
                }
                const gameData = await response.json();
                setGame(gameData);
                } catch (error) {
                    console.log(error);
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
            <h2 className={styles.screenshotsTitle}>{game?.screenshots?.length ? "Screenshots" : "No screenshots available"}</h2>
            {game?.screenshots?.length? <EmblaCarousel slides={slides.map((slide, index) => index)} gameScreenshots={slides}/> : ""}
        </section>

        {/* Section will be updated with logic counting reviews and score */}
        <section className={styles.gameReviewStats}>
            <h2 className={styles.statsTitle}>{game && `${game.name}'s Score`}</h2>
            <div className={styles.scoreContainer}>
                <p className={styles.totalReviews}>0 Total Reviews</p>
                <p className={styles.score}>Score: 95/100</p>
            </div>
        </section>
        {/* Section will be updated with logic showing user reviews*/}
        <section className={styles.gameReviewsContainer}>
            <h2 className={styles.reviewsTitle}>What gamers are saying</h2>
        </section>
        
        {/* Form will be additionally updated with logic*/}
        <section className={styles.submitReviewContainer}>
            <h2 className={styles.submitReviewTitle}>{game && `Played ${game.name}? Leave a review!`}</h2>
            <form className={styles.form}>
                <label htmlFor="reviewScoreInput" className={styles.inputLabel}>Your Score</label>
                <input type="number" 
                       id={styles.reviewScoreInput}
                       min={0}
                       max={100}></input>
                <label htmlFor="reviewScoreInput" className={styles.inputLabel}>Your Review</label>
                <textarea id={styles.reviewInput}></textarea>
                <button className={styles.button} type="submit">Submit Review</button>
            </form>
        </section>
    </main>
    )
}