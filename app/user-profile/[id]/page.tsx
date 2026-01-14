"use client";

import { useAuth } from "@/context/AuthContext";
import styles from "../UserProfile.module.scss";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { UserData } from "@/types/types";
import { Review } from "@/types/types"
import { collection, DocumentData, DocumentSnapshot, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import ReviewComp from "@/components/ReviewComp/ReviewComp";

export default function userProfile() {
    const { user } = useAuth();
    const { id } = useParams();
    const [userData, setUserData] = useState<UserData | null>(null);
    const [userReviews, setUserReviews] = useState<DocumentData[]>([]);
    const [authorRefs, setAuthorRefs] = useState<DocumentSnapshot<DocumentData>[]>([]);
    const [isUser, setIsUser] = useState<boolean>(false);

    // Fetch user data
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`/api/userProfile/${id}`);
                if (!response) {
                    throw new Error("User data not found");
                }
                const userData = await response.json();
                setUserData(userData);
            } catch (error) {
                console.log("error", error);
            }
        };
        fetchUser();
    }, [])

    // Fetch user reviews
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const q = query(collection(db, "gameReviews"), where("authorId", "==", id), orderBy("createdAt", "desc"));
                const querySnapshot = await getDocs(q);
                let userReviews: DocumentData[] = [];
                let authorRefs: DocumentSnapshot<DocumentData>[] = [];
                querySnapshot.forEach((doc) => {
                    // Check if reviews belong to logged-in user
                    if (user?.uid === doc.data().id) {
                        authorRefs.push(doc);
                        return;
                    }
                    const review = doc.data();
                    userReviews.push(review);
                });
                setUserReviews(userReviews);
                if (authorRefs.length > 0) {
                    setIsUser(true)
                    setAuthorRefs(authorRefs);
                };
            } catch (error) {
                console.log(error);
                return;
            }
        }
        fetchReviews()
    }, [])

    return (
        <main className={styles.userProfileMain}>
            <div className={styles.profileContainer}>{!userData ? (
                    <h1 className={styles.profileTitle}>Loading profile...</h1>
                ) : user?.uid === userData?.id ? (
                    <h1 className={styles.profileTitle}>Your Stats</h1>
                ) : (
                    <h1 className={styles.profileTitle}>{`${userData?.userName}'s Stats`}</h1>
                )}
                <div className={styles.statContainer}>
                    <p className={styles.totalReviews}>{`Total Reviews: ${userReviews.length}`}<span className={styles.stat}></span></p>                
                    <p className={styles.score}>Reviews rated helpful: <span className={styles.stat}></span>0 / 100</p>
                </div>
                <div className={styles.reviewContainer}>
                    {userReviews && userReviews.map((review, index) => (
                        <ReviewComp key={index} reviewData={review}/>
                    ))}
                    {/* Conditional Review Comp takes author refs and reviews, splices out ref from list once deleted for rerender */}
                    {isUser && authorRefs.map((review, index) => (
                        <ReviewComp key={index} reviewData={review.data()} authorDoc={review} onDelete={() => setAuthorRefs(prev => prev.filter((_, i) => index !== i))}/>
                    ))}
                    {  }
                </div>
            </div>
        </main>
    )
}