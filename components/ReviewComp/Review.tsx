
"use client";

import styles from "./Review.module.scss";
import type { Review } from "@/types/types";

export default function ReviewComp ({review, isAuthor}: {review: Review, isAuthor: boolean}) { 
    return (
            <div className={styles.review}>
                {isAuthor && <h2 className={styles.authorName}>Your Review</h2>}
                {!isAuthor && <h2 className={styles.authorName}>{`${review.authorUserName}'s Review`}</h2>}
                <p className={styles.reviewScore}>{`${review.gameScore} / 100`}</p>
                <p className={styles.reviewText}>{review.review}</p>
                {isAuthor && <button className={styles.deleteBtn}>Delete</button>}
                {!isAuthor && <button className={styles.rateBtn}>Rate Review</button>}
            </div>
        )
}

// Will be improved - improve buttons, add functions, add condition for user to only submit 1 review per game