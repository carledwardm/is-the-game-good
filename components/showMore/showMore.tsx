import styles from "./showMore.module.scss"
import { Dispatch, SetStateAction } from "react";
import { FaChevronDown } from "react-icons/fa";


export default function showMore({ increaseFunction} : { increaseFunction: Dispatch<SetStateAction<number>>}) {
    return <button className={styles.showMoreButton} onClick={() => increaseFunction}>Show More <FaChevronDown /></button>
}