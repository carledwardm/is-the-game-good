"use client";

import styles from "./Review.module.scss";
import type { Review } from "@/types/types";
import { deleteDoc } from "firebase/firestore";

export default function ReviewComp ({reviewData, isAuthor, onDelete}: {reviewData: Review | any, isAuthor: boolean, onDelete?: () => void}) { 
    let review = null;
    if (isAuthor) {
        review = reviewData.data();
    } else {
        review = reviewData;
    }
    // Deletes the user's review
    const deleteReview = async (e: React.MouseEvent<HTMLButtonElement>) => {
        try {
            await deleteDoc(reviewData.ref);
            onDelete?.();
        } catch (error) {
            console.log(error);            return;
        }

    }

    return (
            <div className={styles.review}>
                {isAuthor && <h2 className={styles.authorName}>Your Review</h2>}
                {!isAuthor && <h2 className={styles.authorName}>{`${review.authorUserName}'s Review`}</h2>}
                <p className={styles.reviewScore}>{`${review.gameScore} / 100`}</p>
                <p className={styles.reviewText}>{review.review}</p>
                {isAuthor && <button className={styles.deleteBtn} onClick={deleteReview}>Delete</button>}
                {!isAuthor && <button className={styles.rateBtn}>Rate Review</button>}
            </div>
        )
}

// Will be improved - improve buttons, add functions, add condition for user to only submit 1 review per game