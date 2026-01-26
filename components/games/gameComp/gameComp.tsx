import { DocumentData, DocumentSnapshot } from "firebase/firestore"
import styles from "./gameComp.module.scss"


export default function gameComp ({ gameSnap } : {gameSnap: DocumentSnapshot<DocumentData>}) {
    const gameData = gameSnap.data();
    return (
        // Box will display box art, title name, review score
        <div className={styles.gameInfoContainer}>
            {/* Image tag will go here */}
            <a href={`/game-page/${gameData?.gameId}`} aria-label={`Link to ${gameData?.gameName ?? 'game'} info page`}>
                <div className={styles.gameNameAndScoreContainer}>
                    <p className={styles.gameName}>{gameData?.name}</p>
                    {/* NEED TO ADD REVIEW SCORE TO GAME DATA */}
                    <p className={styles.gamecore}>{gameData?.reviewScore}</p>
                </div>
            </a>
        </div>
    )
}