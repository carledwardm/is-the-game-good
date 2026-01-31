"use client";

import styles from "./ShowMore.module.scss"
import { Dispatch, SetStateAction } from "react";
import { FaChevronDown } from "react-icons/fa";


type showMoreProps = {
    increaseFunction: Dispatch<SetStateAction<number>>,
    increaseAmount: number,
}

export default function showMore({ increaseFunction, increaseAmount } :  showMoreProps  ) {
    return <button 
        className={styles.showMoreButton} 
        onClick={() => increaseFunction(prev => prev += increaseAmount)}>Show More <FaChevronDown className={styles.chevron}/></button>
}