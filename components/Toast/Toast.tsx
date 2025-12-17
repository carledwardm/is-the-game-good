import styles from "./Toast.module.scss";
import { useEffect, useState } from 'react';

interface toastProps {
    message: string;
    duration?: number;
    onClose: () => void;
}

export default function Toast({message, duration=2000, onClose}: toastProps) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);
        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return <div className={styles.Toast}>    
        {message}
    </div>
}