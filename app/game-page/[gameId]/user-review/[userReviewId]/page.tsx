"use client";
import { doc, DocumentData, DocumentSnapshot, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { useParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import styles from "../UserReview.module.scss"
import ReviewComp from "@/components/ReviewComp/ReviewComp";
import ReviewRating from "@/components/ReviewComp/ReviewRating/ReviewRating"; 

export default function userReviewPage() {
    const { gameId, userReviewId } = useParams();
    const { user } = useAuth();
    const [ reviewDoc, setReviewDoc ] = useState<DocumentSnapshot<DocumentData>>();
    const [ reviewData, setReviewData ] = useState<DocumentData | undefined>(undefined)

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
                console.log(error);
            }
        }
        fetchReviewData();
    }, [userReviewId, gameId])

    return (
        <main className={styles.reviewMain}>
            <h1 className={styles.reviewHeading}>
                {reviewData?.authorId === user?.uid ? 
                (<>
                Your <span className={styles.reviewTitle}>{reviewData?.title}</span> review
                </>) : (<>
                    {reviewData?.authorUserName}'s 
                    <span className={styles.reviewTitle}>{reviewData?.title} review</span>
                </>)}
            </h1>
            <ReviewComp reviewData={reviewDoc} hideCommentButton={true} />
        </main>
        
    )
}