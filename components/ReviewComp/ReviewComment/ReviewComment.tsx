import { deleteDoc, DocumentData, DocumentSnapshot, increment, updateDoc } from "firebase/firestore";
import styles from "./ReviewComment.module.scss";
import { useState } from "react";

export default function ReviewComment({
    isAuthor,
    commentData,
    reviewSnap,
    onDelete,
    onError,
} : {
    isAuthor?: boolean;
    commentData: DocumentSnapshot<DocumentData>,
    reviewSnap?: DocumentSnapshot<DocumentData>
    onDelete?: () => void,
    onError?: () => void,
    }) {
    const commentSnap = commentData;
    const data = commentData.data();
    const [ isDeleting, setIsDeleting ] = useState<boolean>(false);

    const deleteReview = async (e: React.MouseEvent<HTMLButtonElement>) => {
        if (isDeleting) {
            return;
        }
        try {
            setIsDeleting(true);
            await deleteDoc(commentSnap.ref);
            await updateDoc(reviewSnap!.ref, {
                commentCount: increment(-1),
            })
            onDelete?.();
        } catch (error) {
            setIsDeleting(false);
            onError?.();            
        }
    }

    
    return (
        <div className={styles.comment}>
            {isAuthor && <h2 className={styles.authorName}>Your comment</h2>}
            {!isAuthor && <h2 className={styles.authorName}>{data?.authorName}</h2>}
            <p className={styles.commentText}>{data?.userComment}</p>
            {isAuthor && <button className={styles.deleteButton} onClick={deleteReview}>Delete Comment</button>}
        </div>
    )
}