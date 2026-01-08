import styles from "./Review.module.scss";
import type { Review } from "@/types/types";

export default function ReviewComp ({review, isAuthor}: {review: Review, isAuthor: boolean}) { 
    return (
            <div className={styles.review}>
                {isAuthor && <h2>Your Review</h2>}
                {!isAuthor && <h2 className={styles.autherName}>{review.authorUserName}</h2>}
                <p className={styles.reviewScore}>{review.gameScore}</p>
                <p className={styles.reviewText}>{review.review}</p>
                {isAuthor && <button>Delete</button>}
                {!isAuthor && <button>Helpful?</button>}
            </div>
        )
}

// Will be improved - isAuthor will conditionally render a delete button, which can trigger a function to delete review passed in