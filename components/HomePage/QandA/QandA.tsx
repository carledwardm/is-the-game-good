import styles from "./QandA.module.scss";

export default function QandA() {
    return (
        <section className={styles.QandASection}>
            <h2 className={styles.questionsTitle}>Frequently Asked Questions</h2>
            <div className={styles.questionAndAnswerContainer}>
                <p className={styles.question}>How does ranking for games work?</p>
                <p className={styles.answer}>User review scores are combined and then run through a calculation to account for the amount of reviews present. 
                    This way, a game with a perfect score but only a few reviews won't rank over a game with a lower average, but a much higher
                    review count.</p>
            </div>
            <div className={styles.questionAndAnswerContainer}>
                <p className={styles.question}>Do I need an account to read reviews?</p>
                <p className={styles.answer}>Nope! Anyone can browse games and read player reviews without signing up. You only need an account 
                    if you want to review a game and give a score, or score and leave a comment on another review.</p>
            </div>
            <div className={styles.questionAndAnswerContainer}>
                <p className={styles.question}>Can I edit my review after posting?</p>
                <p className={styles.answer}>No, reviews can't be edited at this time. HOWEVER, it's very easy to just delete the rebview and post
                    a new one. That's why the delete button is located on the same screen if it's your review!
                </p>
            </div>
            <div className={styles.questionAndAnswerContainer}>
                <p className={styles.question}>What makes a good review here?</p>
                <p className={styles.answer}>Think about what you'd want to know before buying a game. Share your honest thoughts to help fellow 
                    gamers decide if it's worth their time and cash!</p>
            </div>
        </section>
    )
}