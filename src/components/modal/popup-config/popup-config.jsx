import { useNavigate } from "react-router";
import { DIFFICULTY_MAP, THEME_MAP, translateValue, TYPE_MAP } from "../../../utils/translate-mapping.js";
import styles from "./popup-config.module.css";
import Button from "../../ui/buttons/buttons.jsx";

export default function ConfigPopup({ gameConfig, setGamehasStarted }) {
    const navigate = useNavigate();
    const isGameConfigEmpty = !gameConfig || !gameConfig.nb_questions || !gameConfig.difficulty || !gameConfig.mode;

    return (
        <div className={styles.popup}>
            <div className={styles.color_bar}></div>
            {isGameConfigEmpty && (
                <div className={styles.nogame}>
                    <p>Veuillez paramétrer une partie pour jouer.</p>
                    <Button
                        type="button"
                        onClick={() => navigate("/quiz-config")}
                        variant={"btn_play"}
                    >
                        Configurer une partie
                    </Button>
                </div>
            )}
            {!isGameConfigEmpty && (
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
                                {gameConfig?.theme?.map((th, index) => (
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
                        <Button
                            type="button"
                            onClick={() => navigate("/quiz-config")}
                            variant={"btn_back_popup"}
                        >
                            Retour
                        </Button>
                        <Button
                            type="button"
                            onClick={() => setGamehasStarted(true)}
                            variant={"btn_play"}
                        >
                            Jouer
                        </Button>
                    </div>
                </>
            )}
        </div>
    )
}