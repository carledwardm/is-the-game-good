"use client";
import { auth, db } from '@/lib/firebaseConfig';
import styles from "./Signup.module.scss";
import { createUserWithEmailAndPassword} from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';
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

    const signUp = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
        await setDoc(doc(db, "users", user.uid), {
            userName,
            email,
            password,
            createdAt: new Date(),
        });
        setSuccess("Account created successfully, redirecting!");
        setTimeout(() => {
            router.push("/");
        }, 2000);
        
        } catch (error: any) {
            if (error.code === "auth/email-already-in-use") {
                setError("An account with this email already exists.");
            } else {
                setError("Failed to create an account, please try again");
            } console.error(error);
        }
            finally {
            setisSubmitting(false);}
        };

    return (
        <main className={styles.signUpMain}>
            <div className={styles.signupContainer}>
                <h1>Signup Page</h1>
                <form onSubmit={signUp} className={styles.form}>
                    <input type="text" value={userName} placeholder="Username" onChange={(e) => setUserName(e.target.value)} className={styles.input}></input>
                    <input type="text" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} className={styles.input}></input>
                    <input type="text" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} className={styles.input}></input>
                   <button type="submit" className={styles.button} >Sign Up</button>
                </form>
            </div>
        </main>
    )
}