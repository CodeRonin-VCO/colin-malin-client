import styles from "./confirm-dialog.module.css";
import Button from "../buttons/buttons.jsx";

/**
 * Composant ConfirmDialog pour afficher une modale de confirmation.
 * @param {Object} props - Props du composant.
 * @param {string} props.message - Message de confirmation à afficher.
 * @param {Function} props.onConfirm - Callback exécuté lors de la confirmation.
 * @param {Function} props.onCancel - Callback exécuté lors de l'annulation.
 */
export default function ConfirmDialog({ message, onConfirm, onCancel }) {
    return (
        <div className={styles.overlay}>
            <div className={styles.dialog}>
                <p>{message}</p>
                <div className={styles.actions}>
                    <Button variant="btn_back" onClick={onCancel}>Annuler</Button>
                    <Button variant="delete_btn" onClick={onConfirm}>Supprimer</Button>
                </div>
            </div>
        </div>
    )
}