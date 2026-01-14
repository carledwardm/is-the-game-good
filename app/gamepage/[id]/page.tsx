"use client";
import styles from "../GamePage.module.scss";
import { addDoc, collection, deleteDoc, doc, DocumentData, getDoc, getDocs, query, DocumentSnapshot, where, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import * as React from "react";
import { useEffect, useState } from 'react';
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import EmblaCarousel from "@/components/GamePage/Carousel";
import { useAuth } from "@/context/AuthContext"
import Toast from "@/components/Toast";
import type { Review } from "@/types/types";
import ReviewComp from "@/components/ReviewComp/ReviewComp";
import ShowMore from "@/components/ShowMore/ShowMore";

export default function gamePage() {
    const [game, setGame] = useState<any>(null);
    const [slides, setSlides] = useState<string[]>([])
    const [gameScore, setGameScore] = useState<number>(0);
    const [averageScore, setAverageScore] = useState<number>(0);
    const [reviewInput, setReviewInput] = useState<string>("");
    const [gameReviews, setGameReviews] = useState<Review[]>([]);
    const [userReview, setUserReview] = useState<DocumentSnapshot<DocumentData> | null>(null);
    const [showToast, setShowToast] = useState<boolean>(false);
    const [toastMessage, setToastMessage] = useState<string>("");
    const [displayCount, setDisplayCount] = useState<number>(6);
    const { user } = useAuth();
    const router = useRouter();
    type Params = {id: string}
    const { id } = useParams() as Params;

    // Fetch game data by ID
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

    // Fetch available screenshots for rendering 
    useEffect(() => {
        if (game?.screenshots) {
        setSlides(game.screenshots.slice(0, 10) || []);
        }
    }, [game])

    // Fetch game reviews
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const q = query(collection(db, "games", id, "reviews"), orderBy("createdAt", "desc"));
                const querySnapshot = await getDocs(q);
                let reviews: Review[] = [];
                querySnapshot.forEach((doc) => {
                    const review = doc.data() as Review;
                    // Checks if the review was created by the logged-in user, sets it in its own state/variable if so
                    if (review.authorId === user?.uid) {
                        // Sets the user review as the doc to allow the review component to delete directly
                        setUserReview(doc);
                    }
                    // All non-logged-in user reviews are pushed
                    reviews.push(review);
                });
                // Push user's review to front, then sort by descending creation date
                const sortedReviews = reviews.sort((a, b) => {
                    return b.createdAt - a.createdAt;
                })
                setGameReviews(sortedReviews);
            } catch (error) {
                console.log(error);
            }
        }
        fetchReviews();
    }, [user]); // Depends on the user variable from useAuth() import, re-renders and filters user review if logged in

    // Update game review stats 
    useEffect(() => {
        let addedScore = 0;
        const numReviews = userReview? gameReviews.length + 1 : gameReviews.length;
        if (gameReviews) {
            // numReviews accounts for an extra value if user review exists
            for (const review of gameReviews) {
                addedScore += review.gameScore;
            }
        }
        setAverageScore(addedScore / numReviews);
    }, [gameReviews])

    // Submits the user review
    const submitReview = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!gameScore && !reviewInput) {
            setShowToast(true);
            setToastMessage("Review score and text are both required.");
            return;
        }
        if (!gameScore) {
            setShowToast(true);
            setToastMessage("Review score is required.");
            return;
        }
        if (!reviewInput) {
            setShowToast(true);
            setToastMessage("Review text is required.");
            return;
        }
        if (!user) {
            setShowToast(true);
            setToastMessage("You must be logged in to leave a review");
            return;
        }
        if (userReview) {
            setShowToast(true);
            setToastMessage("You have already left a review for this title");
            return;
        }
        try {
            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);
            if (!userSnap.exists()) {
                throw new Error("An error has occurred")
            }
            const newReview: Review = {
                title: game.name,
                gameId: id as string,
                authorId: user.uid,
                authorUserName: userSnap.data().userName,
                createdAt: Math.floor(Date.now() / 1000),
                gameScore: gameScore,
                review: reviewInput,
                commentCount: 0,
                helpfulScore: 0,
            }

            if (!id) {
                return;
            }
            
            const newDocRef = await addDoc(collection(db, "games", id, "reviews"), newReview);
            const userReview = await getDoc(newDocRef);
            setUserReview(userReview);
            setShowToast(true);
            setToastMessage("Your review has been submitted");
            setGameScore(0);
            setReviewInput("");
        } catch (error) {
            setShowToast(true);
            setToastMessage("An error has occurred, please try again.");
        }
    }

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

        {/* Review score and number of reviews displayed here */}
        <section className={styles.gameReviewStats}>
            <h2 className={styles.statsTitle}>{game && `${game.name}'s Score`}</h2>
            <div className={styles.scoreContainer}>
                <p className={styles.totalReviews}>Total Reviews: <span className={styles.stat}>{`${userReview ? gameReviews.length + 1 : gameReviews.length}`}</span></p>                
                <p className={styles.score}>Score: <span className={styles.stat}>{`${Math.floor(averageScore) || 0}`}</span> / 100</p>
            </div>
        </section>
        {/* User reviews are displayed here */}
        <section className={styles.gameReviewsContainer}>
            <h2 className={styles.reviewsTitle}>Reviews</h2>
            <div className={`${styles.reviewContainer} ${styles.userReviewContainer}`}>
                {/* Passes the author doc to use ref for deletion and data separately if review is by logged-in user */}
                {userReview && <ReviewComp reviewData={userReview.data()} authorDoc={userReview} onDelete={() => setUserReview(null)}/>}
            </div>
            {userReview && <h2 className={styles.otherReviewsTitle}>What other gamers are saying</h2>}
            {(!gameReviews[0] && !userReview) && <h2 className={styles.otherReviewsTitle}>Game has not been reviewed yet</h2>}
            <div className={styles.reviewContainer}>
                {gameReviews.map((review, index) => (
                    // Pass data in reviewData argument for reviews not by logged-in user, prevents delete button usage
                    review.authorId !== user?.uid && index <= displayCount - 1 && <ReviewComp reviewData={review} key={index}/>
                ))}  
            </div>
            {/* Show More button conditionally rendered if reviews exceed 6 */}
                {( gameReviews.length > 6 && <ShowMore increaseFunction={setDisplayCount} currentAmount={displayCount} increaseAmount={6}/> )}
        </section>
        
        {/* Submit review form */}
        <section className={styles.submitReviewContainer}>
            <h2 className={styles.submitReviewTitle}>{game && `Played ${game.name}? Leave a review!`}</h2>
            <form className={styles.form} onSubmit={submitReview}>
                <label htmlFor="reviewScoreInput" className={styles.inputLabel}>Your Score</label>
                <input type="number" 
                       id={styles.reviewScoreInput}
                       min={0}
                       max={100}
                       // On change logic here accounts for if value is ever set to "" during rendering to avoid potential error 
                       onChange={(e) => setGameScore(e.target.value === "" ? 0 : parseInt(e.target.value))}
                       value={gameScore}></input>
                <label htmlFor="reviewScoreInput" className={styles.inputLabel}>Your Review</label>
                <textarea id={styles.reviewInput} onChange={(e) => setReviewInput(e.target.value)} value={reviewInput}></textarea>
                <button className={styles.button} type="submit">Submit Review</button>
            </form>
        </section>
        {showToast && (
            <Toast
            message={toastMessage}
            onClose={() => {
                setShowToast(false);
                setToastMessage("");
            }}
            ></Toast>
        )}
    </main>
    )
}