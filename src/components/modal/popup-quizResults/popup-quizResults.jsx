import { useAtom } from "jotai";
import styles from "./popup-quizResults.module.css";
import { gameConfigAtom, userAtom } from "../../../atom/atom.js";
import { THEME_MAP, translateValue } from "../../../utils/translate-mapping.js";
import { useNavigate } from "react-router";
import { GiCheckMark, GiCrossMark } from "react-icons/gi";
import useScores from "../../../hooks/useScores.js";
import useGames from "../../../hooks/useGames.js";

export default function QuizResultsPopup({ answersLog, questions }) {
    const [user] = useAtom(userAtom);
    const [gameConfig, setGameConfig] = useAtom(gameConfigAtom);
    const { fetchCreateGame } = useGames();
    const { fetchAddResults } = useScores();
    const navigate = useNavigate();

    function getScore() {
        return answersLog.filter(a => a.is_correct).length;
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

            // todo: ajouter le temps des réponses
            await fetchAddResults(
                gameId,
                getScore(),
                null,
                { total: questions.length },
                answersLog
            );

        } catch (error) {
            console.error("Erreur lors de la sauvegarde des résultats :", error);
        } finally {
            setGameConfig({
                theme: null,
                difficulty: null,
                mode: null,
                game_id: null
            });
            navigate("/getStarted");
        }
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
            <button className={styles.btn} onClick={() => handleEndQuiz()}>Retour</button>
        </div>
    )
}