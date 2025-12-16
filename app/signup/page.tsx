"use client";
import { db } from '@/lib/firebaseConfig';
import styles from "./Signup.module.scss";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { useState } from 'react';
import { useRouter } from 'next/navigation'

export default function SignUp() {
    const [email, setEmail] = useState<string>("");
    const [userName, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isSubmitting, setisSubmitting] = useState<boolean>(false);
    const [success, setSuccess] = useState<string>("");
    const [error, setError] = useState<string>("")
    const router = useRouter();

    interface IUser {
    id: number;
    userName: string;
    email: string;
    password: string;
    profilePic?: string;
    tagline?: string;
    bio?: string;
    gameReviews?: number;
    reviewReviews?: number;
    }

    const validateForm = (): boolean => {
        if (!email || !userName || !password) {
            setError("Email, User Name and Password are required.")
            return false;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters long");
            return false
        }
        setError("");
        return true;
    }

    // const signUp = async (e: React.FormEvent) => {
    //     e.preventDefault();

    //     const docRef = await addDoc(collection(db, "users"), {

    //     });
    // }

    return (
        <main className={styles.signUpMain}>
            <div className={styles.signupContainer}>
                <h1>Signup Page</h1>
                <form onSubmit={SignUp} className={styles.form}>
                    <input type="text" value={userName} placeholder="Username" onChange={(e) => setUserName(e.target.value)} className={styles.input}></input>
                    <input type="text" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} className={styles.input}></input>
                    <input type="text" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} className={styles.input}></input>
                   <button type="submit" className={styles.button}>Sign Up</button>
                </form>
            </div>
        </main>
    )

}