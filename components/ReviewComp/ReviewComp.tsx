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
    hideCommentButton,
    onDelete,
}:  {
    reviewData?: DocumentSnapshot<DocumentData>,
    authorDoc?: DocumentSnapshot<DocumentData>,
    showTitle?: boolean;
    hideCommentButton?: boolean;
    onDelete?: () => void,
}) { 

    let review = null;
    if (authorDoc && authorDoc !== undefined) {
        review = authorDoc.data();
    } 
    if (reviewData) {
    review = reviewData.data();
    }
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
                {authorDoc && !showTitle && <a  className={styles.profileLink} href={`/user-profile/${review?.authorId}`} aria-label="Link to user profile page"><h2 className={styles.authorName}>Your Review</h2></a>}
                {reviewData && !showTitle && <a className={styles.profileLink} href={`/user-profile/${review?.authorId}`} aria-label="Link to user profile page"><h2 className={styles.authorName}>{`${review?.authorUserName}'s Review`}</h2></a>}
                {showTitle && <h2 className={styles.authorName}>{review?.title}</h2>}
                <p className={styles.reviewScore}>{`${review?.gameScore} / 100`}</p>
                <p className={styles.reviewText}>{review?.review}</p>
                <div className={styles.buttonContainer}>
                    {/* Conditionally render "Comments" button based on commentCount > 0 */}
                    {!hideCommentButton && <a href={`/game-page/${review?.gameId}/user-review/${reviewData?.id || authorDoc?.id}`} className={styles.rateBtn}>Comments</a>}
                    {authorDoc && <button className={styles.deleteBtn} onClick={deleteReview}>Delete</button>}
                </div>
                <div className={styles.statsContainer}>
                    <p className={styles.commentCount}>{`${review?.commentCount} comments`}</p>
                    <p className={styles.helpfulCount}>{`${review?.helpfulScore} found this review helpful`}</p>
                </div>
            </div>
        )
}

// Will be improved - improve buttons, add functions, add condition for user to only submit 1 review per game