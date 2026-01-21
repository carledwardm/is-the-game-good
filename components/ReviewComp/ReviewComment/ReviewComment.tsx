import { DocumentData, DocumentSnapshot } from "firebase/firestore";
import styles from "./ReviewComment.module.scss";

export default function ReviewComment({
    commentData,
    onDelete,
} : {
    commentData: DocumentSnapshot<DocumentData>,
    onDelete?: () => void,
    }) {

    const data = commentData.data();
    return (
        <div className={styles.comment}>
            <h2 className={styles.authorName}>{data?.authorName}</h2>
            <p className={styles.commentText}>{data?.userComment}</p>
        </div>
    )
}