"use client";

import { useAuth } from "@/context/AuthContext";
import styles from "../UserProfile.module.scss";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { UserData } from "@/types/types";
import { collectionGroup, DocumentData, DocumentSnapshot, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import ReviewComp from "@/components/ReviewComp/ReviewComp";
import ShowMore from "@/components/ShowMore";

export default function userProfile() {
    const { user } = useAuth();
    const { id } = useParams();
    const [userData, setUserData] = useState<UserData | null>(null);
    const [userReviews, setUserReviews] = useState<DocumentSnapshot<DocumentData>[]>([]);
    const [authorRefs, setAuthorRefs] = useState<DocumentSnapshot<DocumentData>[]>([]);
    const [isUser, setIsUser] = useState<boolean>(false);
    const [displayCount, setDisplayCount] = useState<number>(6);


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
                alert("An error has occurred while retrieving user data.");
            }
        };
        fetchUser();
    }, [])

    // Fetch user reviews
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const q = query(collectionGroup(db, "reviews"), where("authorId", "==", id), orderBy("createdAt", "desc"));
                const querySnapshot = await getDocs(q);
                let userReviews: DocumentSnapshot<DocumentData>[] = [];
                let authorRefs: DocumentSnapshot<DocumentData>[] = [];
                querySnapshot.forEach((doc) => {
                    // Check if reviews belong to logged-in user
                    if (user?.uid === doc.data().authorId) {
                        authorRefs.push(doc);
                        return;
                    }
                    const review = doc;
                    userReviews.push(review);
                });
                setUserReviews(userReviews);
                if (authorRefs.length > 0) {
                    setIsUser(true);
                    setAuthorRefs(authorRefs);
                };
            } catch (error) {
                return;
            }
        }
        fetchReviews()
    }, [user])

    return (
        <main className={styles.userProfileMain}>
            <div className={styles.profileContainer}>{!userData ? (
                    <h1 className={styles.profileTitle}>Loading profile...</h1>
                ) : user?.uid === userData?.id ? (
                    <h1 className={styles.profileTitle}>Your Reviews</h1>
                ) : (
                    <h1 className={styles.profileTitle}>{`${userData?.userName}'s Reviews`}</h1>
                )}
                <div className={styles.statContainer}>
                    <p className={styles.totalReviews}>{`Total Reviews: ${userReviews?.length || authorRefs?.length}`}<span className={styles.stat}></span></p>                
                </div>
                <div className={styles.reviewContainer}>
                    {!isUser &&  userReviews.map((review, index) => (
                        index <= displayCount - 1 && <ReviewComp key={index} reviewData={review} showTitle={true}/>
                    ))}
                    {/* Conditional Review Comp takes author refs and reviews, splices out ref from list once deleted for rerender */}
                    {isUser && authorRefs.map((review, index) => (
                        index <= displayCount - 1 && <ReviewComp key={index} authorDoc={review} showTitle={true} onDelete={() => setAuthorRefs(prev => prev.filter((_, i) => index !== i))}/>
                    ))}
                </div>
                {( (userReviews.length > 6 || authorRefs.length > 6) && <ShowMore increaseFunction={setDisplayCount} currentAmount={displayCount} increaseAmount={3}/> )} 
            </div>
        </main>
    )
}