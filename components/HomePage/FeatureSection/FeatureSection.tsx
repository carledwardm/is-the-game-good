import styles from "./FeatureSection.module.scss";
import Image from "next/image";

export default function FeatureSection() {
    return (
        <section className={styles.featuresSection}>
            <div className={styles.featureContainer}>
                <div className={styles.textContainer}>
                    <h2>See what gamers really think</h2>
                    <p>Every score comes from actual players like you - cutting through the noise of paid promotions and reviews.
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
                        src="/fightstick.jpg"
                        fill
                        alt="Arcade fightstick with yellow joystick and blue buttons"
                    />     
                </div>
                <div className={styles.textContainer}>
                    <h2>See what gamers really think</h2>
                    <p>Every score comes from actual players like you - cutting through the noise of paid promotions and reviews.
                        Trust the voices that matter the most - the players! 
                    </p>
                </div>
            </div>
            <div className={styles.featureContainer}></div>
        </section>
    )
}