"use client";

import styles from "./ReviewComp.module.scss";
import type { Review } from "@/types/types";
import { deleteDoc, DocumentData, DocumentSnapshot } from "firebase/firestore";

// ReviewData is for reviews not by logged-in user
// authorDoc is for reviews by the logged-in user
export default function ReviewComp ({
    reviewData, 
    authorDoc,
    showTitle,
    onDelete,
}:  {
    reviewData?: Review | any,
    authorDoc?: DocumentSnapshot<DocumentData>,
    showTitle?: boolean;
    onDelete?: () => void,
}) { 

    let review = null;
    review = reviewData;
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

    return (
            <div className={authorDoc? `${styles.userReview} ${styles.review}` : styles.review}>
                {authorDoc && !showTitle && <a  className={styles.profileLink} href={`/user-profile/${review.authorId}`} aria-label="Link to user profile page"><h2 className={styles.authorName}>Your Review</h2></a>}
                {!authorDoc && !showTitle && <a className={styles.profileLink} href={`/user-profile/${review.authorId}`} aria-label="Link to user profile page"><h2 className={styles.authorName}>{`${review.authorUserName}'s Review`}</h2></a>}
                {showTitle && <h2 className={styles.authorName}>{review.title}</h2>}
                <p className={styles.reviewScore}>{`${review.gameScore} / 100`}</p>
                <p className={styles.reviewText}>{review.review}</p>
                {authorDoc && <button className={styles.deleteBtn} onClick={deleteReview}>Delete</button>}
                {!authorDoc && <button className={styles.rateBtn}>Rate Review</button>}
            </div>
        )
}

// Will be improved - improve buttons, add functions, add condition for user to only submit 1 review per game