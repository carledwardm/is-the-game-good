import styles from "./Review.module.scss";
import type { Review } from "@/types/types";

export default function ReviewComp ({review}: {review: Review}) { 
    return <div className={styles.review}>{review.review}</div>
}