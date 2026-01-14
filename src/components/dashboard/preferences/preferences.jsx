import styles from "./preferences.module.css";
import paresseux from "./../../../assets/paresseux-work.png";

export default function PreferencesDashboard() {
    
    return (
        <div className={styles.preferences}>
            <img src={paresseux} alt="image d'un paresseux qui dirige un chantier" />
            <h4>Oups ! Cette page n’est pas encore prête. Revenez plus tard !</h4>
        </div>
    )
}