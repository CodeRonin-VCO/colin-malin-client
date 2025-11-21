import { useEffect, useState } from "react";
import useGames from "../../../hooks/useGames.js";
import ProgressByDateChart from "../charts/byDateChart/byDateChart.jsx";
import styles from "./overview.module.css";
import useScores from "../../../hooks/useScores.js";
import { DIFFICULTY_MAP, translateArray, translateValue } from "../../../utils/translate-mapping.js";
import ProgressByDifficultyChart from "../charts/byDifficulty/byDifficulty.jsx";
import ProgressByThemeChart from "../charts/bytheme/bytheme.jsx";

export default function OverviewDashboard() {
    const { fetchGetGames } = useGames();
    const { fetchFilteredResults } = useScores();
    const [totalCountGames, setTotalCountGames] = useState(0);
    const [totalCountQuestions, setTotalCountQuestions] = useState(0);
    const [totalCorrectAnswers, setTotalCorrectAnswers] = useState(0);
    const [percentageResult, setPercentageResult] = useState(0);
    const [bestScore, setBestScore] = useState(null);

    useEffect(() => {
        const loadGames = async () => {
            try {
                const { totalCountGames, totalCountQuestions, totalCorrectAnswers } = await fetchGetGames();
                setTotalCountGames(totalCountGames);
                setTotalCountQuestions(totalCountQuestions);
                setTotalCorrectAnswers(totalCorrectAnswers);
                if (totalCountQuestions > 0) {
                    setPercentageResult(
                        ((totalCorrectAnswers / totalCountQuestions) * 100).toFixed(1)
                    );
                } else {
                    setPercentageResult(0);
                };

            } catch (error) {
                console.error("Erreur lors du chargement des parties :", error);
            };
        };

        const loadScore = async () => {
            try {
                const { response } = await fetchFilteredResults(null, null, true);
                if (response.scores && response.scores.length > 0) {
                    setBestScore(response.scores[0]);
                }

            } catch (error) {
                console.error("Erreur lors du chargement du meilleur score :", error);
            }
        }

        loadGames();
        loadScore();

    }, []);

    if (totalCountGames === 0) {
        return (
            <div className={styles.overview_empty}>
                <h3>Aucune statistique disponible</h3>
                <p>Vous n'avez pas encore joué de partie.</p>
                <p>Lancez un quiz pour commencer à générer vos statistiques.</p>
            </div>
        );
    }

    return (
        <div className={styles.overview}>
            <div className={styles.nb_part}>
                <p>Parties jouées</p>
                <h4>{totalCountGames}</h4>
                <p>{totalCountQuestions} questions au total</p>
            </div>
            <div className={styles.correct_answer}>
                <p>Réponses correctes</p>
                <h4>{totalCorrectAnswers}</h4>
                <p>sur {totalCountQuestions}</p>
            </div>
            <div className={styles.avg_score}>
                <p>Taux de réussite</p>
                <h4>{percentageResult}%</h4>
                <p>Performances globales</p>
            </div>
            <div className={styles.best_score}>
                <p>Meilleurs scores</p>
                <h4>
                    {bestScore?.points} / {bestScore?.Game?.nb_questions}
                </h4>
                <p>En mode "{translateValue(bestScore?.Game?.difficulty, DIFFICULTY_MAP)}"</p>
            </div>

            <div className={styles.progress_byDate}>
                <ProgressByDateChart />
            </div>

            <div className={styles.info_text}>
                <p>Marre de jouer les mêmes questions? Envie de voir de nouvelles idées débarquer ? Rejoignez-nous et transformez l’ordinaire en extraordinaire !</p>
            </div>

            <div className={styles.progress_byDifficulty}>
                <ProgressByDifficultyChart />
            </div>

            <div className={styles.progress_bytheme}>
                <ProgressByThemeChart />
            </div>
        </div>
    )
}