"use client";

import { useAuth } from "@/context/AuthContext";
import styles from "../UserProfile.module.scss";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { UserData } from "@/types/types";
import { Review } from "@/types/types"
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";

export default function userProfile() {
    const { user } = useAuth();
    const { id } = useParams();
    const [userData, setUserData] = useState<UserData | null>(null);
    const [userReviews, setUserReviews] = useState<Review[] | []>([]);

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
                console.log(userData);
                console.log(userData.id);
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
                const q = query(collection(db, "gameReviews"), where("authorId", "==", id));
                const querySnapshot = await getDocs(q);
                let reviews: Review[] = [];
                querySnapshot.forEach((doc) => {
                    const review = doc.data() as Review;
                    reviews.push(review);
                });
                const sortedReviews = reviews.sort((a, b) => {
                    return b.createdAt - a.createdAt;
                })
                setUserReviews(sortedReviews);
                console.log(sortedReviews);
            } catch (error) {
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
                    <p className={styles.totalReviews}>Total Reviews: <span className={styles.stat}></span></p>                
                    <p className={styles.score}>Reviews rated helpful: <span className={styles.stat}></span> / 100</p>
                </div>
            </div>
        </main>
    )
}