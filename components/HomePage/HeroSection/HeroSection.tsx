import styles from "./HeroSection.module.scss";
import { useAuth } from "@/context/AuthContext"; 

export default function HeroSection() {
    const { user } = useAuth();

    return (
        <section className={styles.heroSection}>
            <div className={styles.textContainer}><h1 className={styles.heroTitle}>Is The Game Good?</h1>
                <p className={styles.heroDescription}>Review games - or leave comments and likes on reviews!</p>
                { user ? <p className={styles.greeting}>Welcome, {user.displayName}!</p> : <a href="/login" className={styles.logInButton}>Log In</a> }
            </div>
        </section>
    )
    
}