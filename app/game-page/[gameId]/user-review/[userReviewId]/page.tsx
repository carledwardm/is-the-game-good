"use client";
import { doc, DocumentData, DocumentSnapshot, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { useParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import styles from "../UserReview.module.scss"
import ReviewComp from "@/components/ReviewComp/ReviewComp";
import ReviewRating from "@/components/ReviewComp/ReviewRating/ReviewRating"; 
import Toast from "@/components/Toast";

export default function userReviewPage() {
    const { gameId, userReviewId } = useParams();
    const { user, loading } = useAuth();
    const [ reviewDoc, setReviewDoc ] = useState<DocumentSnapshot<DocumentData>>();
    const [ reviewData, setReviewData ] = useState<DocumentData | undefined>(undefined);
    const [ userComment, setUserComment ] = useState<string>("");
    const [ showToast, setShowToast ] = useState<boolean>(false);
    const [ toastMessage, setToastMessage ] = useState<string>("");

    useEffect(() => {
        console.log(typeof(gameId), gameId);
        console.log(typeof(userReviewId))
        const fetchReviewData = async () => {
            try {
                const reviewRef = doc(db, "games", gameId as string, "reviews", userReviewId as string);
                const reviewDoc = await getDoc(reviewRef);
                const reviewData = reviewDoc.data();
                setReviewDoc(reviewDoc);
                setReviewData(reviewData);
            } catch (error) {
                setShowToast(true);
                setToastMessage("An error has occurred fetching the review data, please try again");
            }
        }
        fetchReviewData();
    }, [userReviewId, gameId]);

    const submitComment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            setShowToast(true);
            setToastMessage("You must be logged in to leave comments.");
            return;
        }
        const commentRef = doc(db, "games", gameId as string, "reviews", userReviewId as string, "comments", user?.uid);
        try {
            await setDoc(commentRef, {
                userComment: userComment,
                authorId: user?.uid,
            });
        } catch (error) {
            setShowToast(true);
            setToastMessage("An error has occurred, please try again.");
        }
    }

    return (
        <main className={styles.reviewMain}>
            <div className={styles.reviewCommentsContainer}>
                {loading || !reviewData ? <h1 className={styles.reviewHeading}>Loading...</h1> :  
                    <h1 className={styles.reviewHeading}>
                    {reviewData?.authorId === user?.uid ? 
                    (<>
                    Your <span className={styles.reviewTitle}>{reviewData?.title} </span>review
                    </>) : (<>
                        {reviewData?.authorUserName}'s 
                        <span className={styles.reviewTitle}>{reviewData?.title} </span>review
                    </>)}
                </h1>
                }
                
                <div className={styles.reviewRow}>
                    <ReviewComp reviewData={reviewDoc} hideCommentButton={true} showHelpfulButton={true}/>
                </div>

                <div className={styles.commentsRow}>
                        {/* Comments will display here */}
                </div>
            </div>

            <div className={styles.leaveCommentContainer}>
                <form className={styles.commentForm}  onSubmit={submitComment}>
                        <label htmlFor="commentInput" className={styles.inputLabel}>Leave a Comment</label>
                        <textarea id={styles.commentInput} onChange={(e) => {setUserComment(e.target.value)}}></textarea>
                        <button className={styles.submitBtn} type="submit">Leave Comment</button>
                </form>
            </div>
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