import { useAuth } from "@/context/AuthContext";
import styles from "../UserProfile.module.scss";
import { useParams } from "next/navigation";

export default function userProfile() {
    const { user } = useAuth();
    const { id } = useParams();

    return (
        <main className={styles.userProfileMain}>
            <h1>User's Profile!</h1>
        </main>
    )
}