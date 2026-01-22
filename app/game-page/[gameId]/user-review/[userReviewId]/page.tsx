"use client";
import { collection, doc, DocumentData, DocumentSnapshot, getDoc, getDocs, increment, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { useParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import styles from "../UserReview.module.scss"
import ReviewComp from "@/components/ReviewComp/ReviewComp";
import ReviewComment from "@/components/ReviewComp/ReviewComment/ReviewComment"; 
import Toast from "@/components/Toast";

export default function userReviewPage() {
    const { gameId, userReviewId } = useParams();
    const { user, loading, userName } = useAuth();
    const [ reviewDoc, setReviewDoc ] = useState<DocumentSnapshot<DocumentData>>();
    const [ reviewData, setReviewData ] = useState<DocumentData | undefined>(undefined);
    const [ userCommentInput, setUserCommentInput ] = useState<string>("");
    const [ showToast, setShowToast ] = useState<boolean>(false);
    const [ toastMessage, setToastMessage ] = useState<string>("");
    const [ comments, setComments ] = useState<DocumentSnapshot<DocumentData>[] | []>([]);
    const [ userComment, setUserComment ] = useState<DocumentSnapshot<DocumentData> | null>(null); 
    const [ isAuthor, setIsAuthor ] = useState<boolean>(false);

    useEffect(() => {
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

    useEffect(() => {
        if (loading) {
            return;
        }
        const fetchComments = async () => {
            try {
                const commentsRef = collection(db, "games", gameId as string, "reviews", userReviewId as string, "comments");
                const commentsSnapshot = await getDocs(commentsRef);
                let comments: DocumentSnapshot<DocumentData>[] = [];
                commentsSnapshot.forEach((doc) => {
                    if (doc.id === user?.uid) {
                        setUserComment(doc);
                        setIsAuthor(true);
                        return;
                    }
                    comments.push(doc);
                });
                if (comments.length > 0) {
                    setComments(comments);
                }
            } catch (error) {
                setShowToast(true);
                setToastMessage("An error has occurred fetching comments.")
            }
        }
        fetchComments();
    }, [loading]);

    const submitComment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!reviewDoc) {
            setShowToast(true);
            setToastMessage("No review found to comment.");
            return;
        }
        if (!user) {
            setShowToast(true);
            setToastMessage("You must be logged in to leave comments.");
            return;
        }
        const commentRef = doc(db, "games", gameId as string, "reviews", userReviewId as string, "comments", user?.uid);
        try {
            await setDoc(commentRef, {
                userComment: userCommentInput,
                authorId: user?.uid,
                authorName: userName,
            });
            await updateDoc(reviewDoc!.ref, {
                commentCount: increment(1)
                });
            const userComment = await getDoc(commentRef);
            setUserComment(userComment);
            setShowToast(true);
            setToastMessage("Your comment has been submitted.");
        } catch (error) {
            setShowToast(true);
            setToastMessage("An error has occurred, please try again.");
        }
    }

    return (
        <main className={styles.reviewMain}>
            <div className={styles.reviewContainer}>
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
            </div>

            <div className={styles.commentsContainer}>
                    {/* Comments will display here */}
                    <h2 className={styles.commentsTitle}>{loading ? "Loading..." : "Comments"}</h2>
                    {userComment && 
                        <ReviewComment 
                            commentData={userComment} 
                            reviewSnap={reviewDoc} 
                            isAuthor={isAuthor}
                            onDelete={() => {
                                setShowToast(true)
                                setToastMessage("Your comment has been deleted.")
                                setUserComment(null);
                            }} 
                    />}
                    <hr className={styles.divider}></hr>
                    <div className={styles.commentsRows}>
                    {comments.map((comment, index) => (
                        <ReviewComment 
                            commentData={comment} 
                            key={index} 
                            onError={() => {
                                setShowToast(true);
                                setToastMessage("An error has occurred while deleting your comment.");
                            }}
                        />
                    ))}
                    </div>
                </div>

            <div className={styles.leaveCommentContainer}>
                <form className={styles.commentForm}  onSubmit={submitComment}>
                        <label htmlFor="commentInput" className={styles.inputLabel}>Leave a Comment</label>
                        <textarea id={styles.commentInput} onChange={(e) => {setUserCommentInput(e.target.value)}}></textarea>
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