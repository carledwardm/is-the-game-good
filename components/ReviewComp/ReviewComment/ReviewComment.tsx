import { DocumentData, DocumentSnapshot } from "firebase/firestore";
import styles from "./ReviewComment.module.scss";

export default function ReviewComment({
    isAuthor,
    commentData,
    onDelete,
} : {
    isAuthor?: boolean;
    commentData: DocumentSnapshot<DocumentData>,
    onDelete?: () => void,
    }) {

    const data = commentData.data();
    return (
        <div className={styles.comment}>
            {isAuthor && <h2 className={styles.authorName}>Your comment</h2>}
            {!isAuthor && <h2 className={styles.authorName}>{data?.authorName}</h2>}
            <p className={styles.commentText}>{data?.userComment}</p>
            {isAuthor && <button className={styles.deleteButton}>Delete Comment</button>}
        </div>
    )
}