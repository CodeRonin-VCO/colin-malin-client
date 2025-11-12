import { useNavigate } from "react-router";
import { DIFFICULTY_MAP, THEME_MAP, translateValue, TYPE_MAP } from "../../../utils/translate-mapping.js";
import styles from "./popup-config.module.css";

export default function ConfigPopup({ gameConfig, setGamehasStarted }) {
    const navigate = useNavigate();

    return (
        <div className={styles.popup}>
            <div className={styles.color_bar}></div>
            {gameConfig === null && (
                <div className={styles.nogame}>
                    <p>Veuillez paramétrer une partie pour jouer.</p>
                    <button className={styles.btn_play} onClick={() => navigate("/quiz-config")}>Configurer une partie</button>
                </div>
            )}
            {gameConfig && (
                <>
                    
                    <h3>Valider le choix <span className={styles.title_color}>de partie ?</span></h3>

                    <div className={styles.container_grid}>
                        <div className={styles.questions}>
                            <span>Questions</span>
                            <span>{gameConfig.nb_questions}</span>
                        </div>

                        <div className={styles.difficulty}>
                            <span>Difficulté</span>
                            <span>{translateValue(gameConfig.difficulty, DIFFICULTY_MAP)}</span>
                        </div>

                        <div className={styles.container_theme}>
                            <span>Thèmes</span>
                            <span>
                                {gameConfig.theme.map((th, index) => (
                                    <span key={index} className={styles.theme}>{translateValue(th, THEME_MAP)}</span>
                                ))}
                            </span>
                        </div>

                        <div className={styles.mode}>
                            <span>Mode</span>
                            <span>{translateValue(gameConfig.mode, TYPE_MAP)}</span>
                        </div>
                    </div>
                    <div className={styles.container_btn}>
                        <button onClick={() => navigate("/quiz-config")}>Retour</button>
                        <button className={styles.btn_play} onClick={() => setGamehasStarted(true)}>Jouer</button>
                    </div>
                </>
            )}
        </div>
    )
}