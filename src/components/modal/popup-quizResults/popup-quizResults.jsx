import { useAtom } from "jotai";
import styles from "./popup-quizResults.module.css";
import { gameConfigAtom, userAtom } from "../../../atom/atom.js";
import { THEME_MAP, translateValue } from "../../../utils/translate-mapping.js";
import { useNavigate } from "react-router";
import { GiCheckMark, GiCrossMark } from "react-icons/gi";
import useScores from "../../../hooks/useScores.js";
import useGames from "../../../hooks/useGames.js";
import Button from "../../ui/buttons/buttons.jsx";
import { useState } from "react";
import Toast from "./../../ui/toast/toast.jsx";

export default function QuizResultsPopup({ answersLog, questions }) {
    const [user] = useAtom(userAtom);
    const [gameConfig, setGameConfig] = useAtom(gameConfigAtom);
    const { fetchCreateGame } = useGames();
    const { fetchAddResults } = useScores();
    const navigate = useNavigate();
    const [toast, setToast] = useState(null);

    function getScore() {
        return answersLog.filter(a => a.is_correct).length;
    }

    function getTimeSpent() {
        return answersLog.map(q => q.time_spent).reduce((acc, n) => acc + n, 0);
    }

    async function handleEndQuiz() {
        try {
            let gameId = gameConfig.game_id
            if (!gameId) {
                const nbToSend = questions.length;
                const payloadQuestions = questions.map(q => ({
                    question_id: q.question_id,
                    user_answer: answersLog.find(a => a.question_id === q.question_id)?.user_answer || null,
                }));

                const response = await fetchCreateGame(
                    nbToSend,
                    gameConfig.theme,
                    gameConfig.difficulty,
                    gameConfig.mode,
                    payloadQuestions
                );

                gameId = response.response.game.game_id;
                setGameConfig(prev => ({ ...prev, gameId }));
            }

            await fetchAddResults(
                gameId,
                getScore(),
                getTimeSpent(),
                { total: questions.length },
                answersLog
            );

        } catch (error) {
            console.error("Erreur lors de la sauvegarde des résultats :", error);
            setToast({ message: "Une erreur est survenue lors de la sauvegarde de tes résultats.", type: "error" });
            setTimeout(() => navigate("/accueil"), 3500);
            return;

        } finally {
            setGameConfig({
                theme: null,
                difficulty: null,
                mode: null,
                game_id: null
            });
        }
        
        navigate("/accueil");
    };


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
                        <span><em>Votre réponse :</em> {a.user_answer}</span><br />
                        <span><em>Bonne réponse :</em> {a.correct_answer}</span><br />
                        <span className={a.is_correct ? styles.correct : styles.incorrect}>{a.is_correct ? (
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
            <Button
                type="button"
                onClick={() => handleEndQuiz()}
                variant={"btn_quiz_results"}
            >
                Retour
            </Button>

            {/* TOAST */}
            {toast && (<Toast message={toast.message} type={toast.type} onDismiss={() => setToast(null)} />)}
        </div>
    )
}