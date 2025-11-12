import ProgressByDateChart from "../charts/byDateChart/byDateChart.jsx";
import styles from "./overview.module.css";

export default function OverviewDashboard() {

    return (
        <div className={styles.overview}>
            <div className={styles.nb_part}>
                <p>Parties jouées</p>
                <h4>4</h4>
                <p>47 questions au total</p>
            </div>
            <div className={styles.correct_answer}>
                <p>Réponses correctes</p>
                <h4>39</h4>
                <p>sur 47</p>
            </div>
            <div className={styles.avg_score}>
                <p>Taux de réussite</p>
                <h4>82.9%</h4>
                <p>Performances globales</p>
            </div>
            <div className={styles.best_score}>
                <p>Meilleurs scores</p>
                <h4>20/20</h4>
                <p>En mode "Difficile"</p>
            </div>

            <div className={styles.progress_byDate}>
                <ProgressByDateChart />
            </div>

            <div className={styles.most_played_theme}>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore accusamus mollitia quae officiis vel dolores commodi, ab, fuga quas tenetur assumenda</p>
            </div>

            <div className={styles.progress_byDifficulty}>
                <ProgressByDateChart />
            </div>

            <div className={styles.progress_bytheme}>
                <ProgressByDateChart />
            </div>
        </div>
    )
}