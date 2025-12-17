"use client";
import { auth, db } from '@/lib/firebaseConfig';
import styles from "./Signup.module.scss";
import { createUserWithEmailAndPassword} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Toast from "@/components/Toast";

export default function SignUp() {
    const [email, setEmail] = useState<string>("");
    const [userName, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showToast, setShowToast] = useState<boolean>(false);
    const [toastMessage, setToastMessage] = useState<string>("");
    const router = useRouter();

    const validateForm = (): boolean => {
        if (!email || !userName || !password) {
            setToastMessage("Email, User Name and Password are required.")
            return false;
        }
        if (password.length < 6) {
            setToastMessage("Password must be at least 6 characters long");
            return false
        }
        return true;
    }

    const signUp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) {
            setShowToast(true);
            return;
        };
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log(userCredential); // Remove later
            const user = userCredential.user;
        await setDoc(doc(db, "users", user.uid), {
            userName,
            email,
            password,
            createdAt: new Date(),
        });
        setToastMessage("Account created successfully, redirecting!");
        setTimeout(() => {
            router.push("/");
        }, 2000);
        
        } catch (error: any) {
            console.log({error});
            console.log(typeof(error.code));
            console.log(error.code.length);
            console.log(error.code);
            if (error.code === "auth/email-already-in-use") {
                setToastMessage("An account with this email already exists.");
                setShowToast(true);
            } else if (error.code === "auth/invalid-email") {
                setToastMessage("Please use a valid email and try again.");
                setShowToast(true);
            } else {
                setToastMessage("Failed to create an account, please try again");
                setShowToast(true);
            } 
        }
        };

    return (
        <main className={styles.signUpMain}>
            <div className={styles.signupContainer}>
                <h1 className={styles.signUpTitle}>Sign Up</h1>
                <form onSubmit={signUp} className={styles.form}>
                    <input type="text" value={userName} placeholder="Username" onChange={(e) => setUserName(e.target.value)} className={styles.input}></input>
                    <input type="text" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} className={styles.input}></input>
                    <input type="text" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} className={styles.input}></input>
                   <button type="submit" className={styles.button} >Sign Up</button>
                </form>
            </div>
            { showToast && (
                <Toast 
                message={toastMessage}
                onClose={() => {
                    setToastMessage("")
                    setShowToast(false)
                }}/>
            ) }
        </main>
    )
}