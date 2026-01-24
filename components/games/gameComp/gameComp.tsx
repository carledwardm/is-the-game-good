import { DocumentData, DocumentSnapshot } from "firebase/firestore"
import styles from "./gameComp.module.scss"


export default function gameComp (gameSnap: DocumentSnapshot<DocumentData>) {
    return (
        <div className={styles.gameInfoContainer}></div>
    )
}