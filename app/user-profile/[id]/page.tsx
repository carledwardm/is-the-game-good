"use client";

import { useAuth } from "@/context/AuthContext";
import styles from "../UserProfile.module.scss";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { UserData } from "@/types/types";

export default function userProfile() {
    const { user } = useAuth();
    const { id } = useParams();
    const [userData, setUserData] = useState<UserData | null>(null);

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

    return (
        <main className={styles.userProfileMain}>
            {!userData ? (
                <h1 className={styles.profileTitle}>Loading profile...</h1>
            ) : user?.uid === userData?.id ? (
                <h1 className={styles.profileTitle}>Your Profile</h1>
            ) : (
                <h1 className={styles.profileTitle}>{`${userData?.userName}'s Profile!`}</h1>
            )}

        </main>
    )
}