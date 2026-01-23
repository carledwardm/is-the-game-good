"use client";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./games.module.scss";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import Toast from "@/components/Toast";

export default function Games() {
    const searchParams = useSearchParams();
    const [ games, setGames ] = useState([]);
    const [ showToast, setShowToast ] = useState<boolean>(true);
    const [ toastMessage, setToastMessage ] = useState<string>("");
    const searchString = searchParams.get('search');

    useEffect(() => {
        const fetchGames = async () => {
            try {
                if (searchString) {
                    console.log(searchParams.get('search'));
                    const stopWords = ["a", "i", "an", "the", "of", "to", "in", "on", "or"];
                    const stringArray: string[] = searchString.split(" ").filter(word => !stopWords.includes(word));
                    const q = query(collection(db, "games"), where("keywords", "array-contains-any", stringArray));
                    const querySnapshot = await getDocs(q);
                    querySnapshot.docs.forEach((game, index) => {
                        console.log(game.data().name);
                        console.log(index);
                    }) 
                } else {
                    const querySnapshot = await getDocs(collection(db, "games"));
                    querySnapshot.docs.forEach((game, index) => {
                        console.log(game.data().name);
                        console.log(index);
                    })
                } 
            }catch (error) {
                console.log(error);
                setShowToast(true);
                setToastMessage("No results found, please try again");
            }
        }   
        fetchGames();
    }, [searchString]);

    return (
        <main className={styles.gamesMain}>
            <div className={styles.gamesContainer}>
                <h1 className={styles.gamesTitle}>Games will display hereeeee!</h1>
            </div>

            {showToast && (
                <Toast 
                    message={toastMessage}
                    onClose={() => {
                        setToastMessage("");
                        setShowToast(false);
                    }}
                    duration={10000}
                />)
            }

        </main>
    )
}