import styles from "./Review.module.scss";
import type { Review } from "@/types/types";
import { IUser } from "@/types/types";

export default function ReviewComp ({review}: {review: Review}) { 
    return (
        <div className={styles.review}>
            <h1>{review.authorUserName}</h1>
            <p>{review.review}</p>
        </div>
        )
}