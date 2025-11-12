import { useAtom } from "jotai";
import styles from "./popup-quizResults.module.css";
import { gameConfigAtom, userAtom } from "../../../atom/atom.js";
import { THEME_MAP, translateValue } from "../../../utils/translate-mapping.js";
import { useNavigate } from "react-router";
import { GiCheckMark, GiCrossMark } from "react-icons/gi";

export default function QuizResultsPopup({ getScore, answersLog, questions }) {
    const [user] = useAtom(userAtom);
    const [gameConfig, setGameConfig] = useAtom(gameConfigAtom);
    const navigate = useNavigate();

    function handleEndQuiz() {
        // Todo: stocker les données dans la db avant de supprimer
        // try {
        //     await saveResultsToDB({
        //         user_id: user.id,
        //         score: getScore(),
        //         total: questions.length,
        //         answers: answersLog,
        //         config: gameConfig
        //     });
        // } catch (error) {
        //     console.error("Erreur lors de la sauvegarde des résultats :", error);
        //     *afficher un toast ou bloquer le retour
        // } finally {
        //     setGameConfig(null);
        //     navigate("/getStarted");
        // }

        setGameConfig(null);
        navigate("/getStarted");
    }


    return (
        <div className={styles.popup}>
            <div className={styles.color_bar}></div>
            <h3>Fin du quiz</h3>
            <p>Bravo {user.username}, vous avez terminé le test !</p>
            <h4 className={styles.title_color}>Score : {getScore()} / {questions.length}</h4>
            <ul className={styles.answer_summary}>
                {answersLog.map((a, i) => (
                    <li key={i}>
                        <strong className={styles.ques}>{a.question}</strong><br />
                        <span><em>Thème :</em> {translateValue(a.theme, THEME_MAP)}</span><br />
                        <span><em>Votre réponse :</em> {a.given}</span><br />
                        <span><em>Bonne réponse :</em> {a.correct}</span><br />
                        <span className={a.isCorrect ? styles.correct : styles.incorrect}>{a.isCorrect ? (
                            <>
                                <span><GiCheckMark /></span>
                                <span>Correct</span>
                            </>
                        ) : (
                            <>
                                <span><GiCrossMark /></span>
                                <span>Faux</span>
                            </>
                        )}</span>
                    </li>
                ))}
            </ul>
            <button className={styles.btn} onClick={() => handleEndQuiz()}>Retour</button>
        </div>
    )
}