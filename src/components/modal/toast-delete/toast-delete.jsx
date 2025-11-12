import { useState, useEffect } from 'react';
import styles from './toast-delete.module.css';

/**
 * Composant Toast pour afficher des notifications temporaires.
 * @param {Object} props - Props du composant.
 * @param {string} props.message - Message à afficher.
 * @param {string} props.type - Type de toast ("success", "error", "info").
 * @param {number} [props.duration=3000] - Durée d'affichage en ms.
 * @param {Function} props.onDismiss - Callback pour masquer le toast.
 */
export default function Toast({ message, type = "info", duration = 3000, onDismiss }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onDismiss();
        }, duration);
        return () => clearTimeout(timer);
    }, [duration, onDismiss]);

    return (
        <div className={`${styles.toast} ${styles[type]}`}>
            {message}
        </div>
    );
}
