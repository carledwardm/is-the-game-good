"use client"
import styles from "./Login.module.scss"
import { useState } from "react"
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";
import Toast from "@/components/Toast";
import Link from "next/link";

export default function login() {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("");
    const [toastMessage, setToastMessage] = useState<string>("");
    const [showToast, setShowToast] = useState<boolean>(false);
    const router = useRouter();

    const validateForm = (): boolean => {
        if (!email || !password) {
            setToastMessage("Please provide both your email and password.");
            return false;
        }
        return true
    }

    const logIn = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) {
            setShowToast(true);
            return;
        }
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setToastMessage("Successfully logged in!");
            setShowToast(true);
            setTimeout(() => router.push("/"), 2000);
        } catch (error: any) {
            setShowToast(true);
            if (error.code === "auth/invalid-email") {
                setToastMessage("Please provide a valid email and try again.")
            } else if (error.code === "auth/invalid-credential") {
                setToastMessage("The credentials you provided are invalid, please try again.");
            } else {
                console.log(error);
            setToastMessage("An error has occurred, please try again.");
            }
            return;
        }
    }

    return (
        <main className={styles.logInMain}>
            <div className={styles.logInContainer}>
            <h1 className={styles.logInTitle}>Log In</h1>
            <form className={styles.form} onSubmit={logIn}>
                <input type="text" className={styles.input} placeholder="Email" value={email} onChange={(e) => {setEmail(e.target.value)} }></input>
                <input type="password" className={styles.input} placeholder="Password" value={password} onChange={(e) => {setPassword(e.target.value)} }></input>
                <button type="submit" className={styles.button}>Log In</button>
                <p className={styles.signUpText}>Need an account? <Link href="/signup" className={styles.signUpLink}>Sign Up</Link> here!</p>
            </form>
            {showToast && (
                <Toast 
                message={toastMessage}
                onClose={() => {
                    setToastMessage("");
                    setShowToast(false);
                }}/>
            )}
            </div>
        </main>
    )
}