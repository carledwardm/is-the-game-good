import styles from "./FeatureSection.module.scss";
import Image from "next/image";

export default function FeatureSection() {
    return (
        <section className={styles.featureSection}>
            <div className={styles.featureContainer}>
                <div className={styles.textContainer}>
                    <h2 className={styles.featureTitle}>See what gamers really think</h2>
                    <p className={styles.featureText}>Every score comes from actual players like you - cutting through the noise of paid promotions and reviews.
                        Trust the voices that matter the most - the players! 
                    </p>
                </div>
                <div className={styles.imageContainer}>
                    <Image 
                        className={styles.image} 
                        src="/black-dualshock.jpg"
                        fill
                        alt="Black playstation dualshock controller"
                    />   
                </div>
            </div>
            <div className={styles.featureContainer}>
                <div className={styles.imageContainer}>
                     <Image 
                        className={styles.image} 
                        src="/fightstick.png"
                        fill
                        alt="Arcade fightstick with yellow joystick and blue buttons"
                    />     
                </div>
                <div className={styles.textContainer}>
                    <h2 className={styles.featureTitle}>Leave feedback on other player reviews</h2>
                    <p className={styles.featureText}>Leave a comment on each review, or leave a helpful "like" to let users know if the review was 
                        actually useful when deciding to purchase a game or not. 
                    </p>
                </div>
            </div>
        </section>
    )
}