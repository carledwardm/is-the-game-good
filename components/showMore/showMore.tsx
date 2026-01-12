"use client";

import styles from "./ShowMore.module.scss"
import { Dispatch, SetStateAction } from "react";
import { FaChevronDown } from "react-icons/fa";


type showMoreProps = {
    increaseFunction: Dispatch<SetStateAction<number>>,
    currentAmount: number,
    increaseAmount: number,
}

export default function showMore({ increaseFunction, currentAmount, increaseAmount} : showMoreProps ) {
    return <button 
        className={styles.showMoreButton} 
        onClick={() => increaseFunction(currentAmount + increaseAmount)}>Show More <FaChevronDown className={styles.chevron}/></button>
}