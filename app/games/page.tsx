import { Suspense } from "react";
import GamesClient from "@/components/games/gamesClient";
import styles from "./games.module.scss";

export default function Games() {
    return (
      
        <main className={styles.gamesMain}>
            <Suspense fallback={<div>Loading games...</div>}>
                <GamesClient /> 
            </Suspense>
        </main>

    )
}