"use client";

import { db } from "@/lib/firebaseConfig";
import styles from "./ReviewComp.module.scss";
import type { Review } from "@/types/types";
import { collection, deleteDoc, doc, DocumentData, DocumentSnapshot, getDoc, getDocs, increment, setDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FaRegThumbsUp } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";

// ReviewData is for reviews not by logged-in user
// authorDoc is for reviews by the logged-in user
export default function ReviewComp ({
    reviewData, 
    authorDoc,
    showTitle,
    hideCommentButton,
    showHelpfulButton,
    onDelete,
}:  {
    reviewData?: DocumentSnapshot<DocumentData>,
    authorDoc?: DocumentSnapshot<DocumentData>,
    showTitle?: boolean;
    hideCommentButton?: boolean;
    showHelpfulButton?: boolean;
    onDelete?: () => void,
}) { 

    const { user } = useAuth();
    const [ helpfulToggle, setHelpfulToggle ] = useState<boolean>(false);
    const [ helpfulCount, setHelpfulCount ] = useState<number>(0);
    let review = null;

    // Conditionally-passed snapshots get saved to review variable for simple usage
    if (authorDoc && authorDoc !== undefined) {
        review = authorDoc.data();
    } 
    if (reviewData) {
        review = reviewData.data();
    }
    const gameId = review?.gameId;
    const reviewId = reviewData?.id || authorDoc?.id;
    // User ID will be ID of helpful "like"
    const helpfulId = user?.uid;

    useEffect(() => {
        const fetchLikes = async () => {
            if (!gameId) {
                return;
            }
            try {
                console.log(user?.uid);
                const likesSnapshot = await getDocs(collection(db,"games", gameId!, "reviews", reviewId!, "likes"));
                likesSnapshot.forEach(((doc) => {
                    if (user?.uid === doc.id) {
                        console.log("found yours!");
                        setHelpfulToggle(true);
                    }
                }))
                setHelpfulCount(likesSnapshot.size);
            } catch (error) {
                console.log(error);
            }
        }
        fetchLikes()
    }, [gameId, user]);

    // Deletes the user's review if doc was passed due to user being author
    const deleteReview = async (e: React.MouseEvent<HTMLButtonElement>) => {
        try {
            if (!authorDoc) {
                return;
            } 
            else {
            await deleteDoc(authorDoc.ref);
            onDelete?.();
            }
        } catch (error) {
            console.log(error);            
            return;
    }
}

    const toggleHelpful = async () => {
        if (!user) {
            console.log("You need to log in");
            return;
        }
        const helpfulRef = doc(db, "games", gameId!, "reviews", reviewId!, "likes", helpfulId!);
        // Save user's helpful "like" to db, updates ref 
        try {
            const reviewRef = authorDoc?.ref || reviewData?.ref
            if (!helpfulToggle) {
                await setDoc(helpfulRef, {
                authorId: user?.uid,
                });
                setHelpfulToggle(true);
                setHelpfulCount(prev => prev + 1);
                await updateDoc(reviewRef!, {
                    helpfulScore: increment(1)
                });
            } else {
                await deleteDoc(helpfulRef);
                setHelpfulToggle(false);
                if (helpfulCount > 0) {
                    setHelpfulCount(prev => prev - 1);
                    await updateDoc(reviewRef!, {
                    helpfulScore: increment(-1)
                });
                }  
            }
            // Deletes helpful "like" if it exists
            } catch (error) {
                console.log(error);
            }
           
    }

    return (
            <div className={authorDoc? `${styles.userReview} ${styles.review}` : styles.review}>
                {authorDoc && !showTitle && <a  className={styles.profileLink} href={`/user-profile/${review?.authorId}`} aria-label="Link to user profile page"><h2 className={styles.authorName}>Your Review</h2></a>}
                {reviewData && !showTitle && <a className={styles.profileLink} href={`/user-profile/${review?.authorId}`} aria-label="Link to user profile page"><h2 className={styles.authorName}>{`${review?.authorUserName}'s Review`}</h2></a>}
                {showTitle && <h2 className={styles.authorName}>{review?.title}</h2>}
                <p className={styles.reviewScore}>{`${review?.gameScore} / 100`}</p>
                <p className={styles.reviewText}>{review?.review}</p>
                <div className={styles.buttonContainer}>
                    {/* Conditionally render "Comments" button based on commentCount > 0 */}
                    {!hideCommentButton && <a href={`/game-page/${review?.gameId}/user-review/${reviewData?.id || authorDoc?.id}`} className={styles.rateBtn}>Comments</a>}
                    {showHelpfulButton && 
                        <button className={styles.helpfulButton} onClick={toggleHelpful} aria-label="Helpful comment toggle button" aria-pressed={helpfulToggle}>
                            <FaRegThumbsUp className={`${styles.thumbsUpIcon} ${helpfulToggle && styles.isHelpful}`}/>
                        </button>}
                    {authorDoc && <button className={styles.deleteBtn} onClick={deleteReview}>Delete</button>}
                </div>
                <div className={styles.statsContainer}>
                    <p className={styles.commentCount}>{`${review?.commentCount} comments`}</p>
                    <p className={styles.helpfulCount}>{`${helpfulCount} found this review helpful`}</p>
                </div>
            </div>
        )
}

// Will be improved - improve buttons, add functions, add condition for user to only submit 1 review per game