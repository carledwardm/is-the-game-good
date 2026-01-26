import { DocumentData, DocumentSnapshot } from "firebase/firestore"
import styles from "./gameComp.module.scss"
import Image from "next/image";


export default function gameComp ({ gameSnap } : {gameSnap: DocumentSnapshot<DocumentData>}) {
    const gameId = gameSnap.id;
    const gameData = gameSnap.data();
    return (
        // Box will display box art, title name, review score
        <a  className={styles.wrappingLink} href={`/game-page/${gameId}`} aria-label={`Link to ${gameData?.gameName ?? 'game'} info page`}>
            <div className={styles.gameInfoContainer}>
            {/* Image tag will go here */}
            <div className={styles.gameArt}>
                <Image 
                    src={`https:${gameData?.artwork}`}
                    alt={`${gameData?.name} artwork`}
                    fill
                    sizes="width: 100%"
                />
            </div>
            <div className={styles.gameNameAndScoreContainer}>
                <p className={styles.gameName}>{gameData?.name}</p>
                {/* NEED TO ADD REVIEW SCORE TO GAME DATA */}
                <div className={styles.gameStats}>
                    <p className={styles.gameStat}>{`Score: ${gameData?.gameScore}`}</p>
                    <p className={styles.gameStat}>{`Reviews: ${gameData?.numReviews}`}</p>
                </div>
            </div>
            </div>
        </a>
    )
}