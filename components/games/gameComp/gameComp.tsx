import { DocumentData, DocumentSnapshot } from "firebase/firestore"
import styles from "./gameComp.module.scss"


export default function gameComp (gameSnap: DocumentSnapshot<DocumentData>) {
    const gameData = gameSnap.data();
    return (
        // Box will display box art, title name, review score
        <div className={styles.gameInfoContainer}>
            {/* Image tag will go here */}
            <div className={styles.gameNameAndScoreContainer}>
                <p className={styles.gameName}>{gameData?.name}</p>
                {/* NEED TO ADD REVIEW SCORE TO GAME DATA */}
                <p className={styles.gameScore}>{gameData?.reviewScore}</p>
            </div>
            
        </div>
    )
}