import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import useScores from "../../../../hooks/useScores.js";
import { useEffect, useState } from "react";
import { THEME_MAP } from "../../../../utils/translate-mapping.js";

// ==== Chart.js ====
ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    Title
);


// ==== Fonction pour calculer le premier et le dernier jour du mois passé ====
function getLastMonthDates() {
    const now = new Date();
    const startDate = new Date();
    startDate.setDate(now.getDate() - 30); // 30 jours avant aujourd'hui

    const formatDate = (date) => date.toISOString().split('T')[0];
    return {
        startDate: formatDate(startDate),
        endDate: formatDate(now), // Aujourd'hui
    };
}

export default function ProgressByThemeChart() {
    const { fetchScoreByUserId } = useScores();
    const [scoresData, setScoresData] = useState([]);

    useEffect(() => {
        const loadScores = async () => {
            try {
                const { startDate, endDate } = getLastMonthDates();
                const result = await fetchScoreByUserId(null, null, startDate, endDate);
                setScoresData(result.response.scores || []);
            } catch (error) {
                console.error("Erreur chargement scores par thème :", error);
            }
        };

        loadScores();
    }, []);

    // ==== Initialisation des thèmes ====
    const THEMES = ["mix", "sciences", "culture", "geography", "history", "sport", "sociology"];
    const scoresByTheme = THEMES.reduce((acc, theme) => {
        acc[theme] = { totalPoints: 0, totalQuestions: 0 };
        return acc;
    }, {});

    // ==== Remplissage des scores ====
    scoresData.forEach(score => {
        const theme = score.theme ?? "mix";
        if (!scoresByTheme[theme]) scoresByTheme[theme] = { totalPoints: 0, totalQuestions: 0 };
        scoresByTheme[theme].totalPoints += score.points;
        scoresByTheme[theme].totalQuestions += score.nb_questions;
    });

    // ==== Préparation des données pour le chart ====
    const labels = THEMES.map(theme => THEME_MAP[theme]);
    const dataValues = THEMES.map(theme => {
        const entry = scoresByTheme[theme];
        return entry.totalQuestions > 0 ? (entry.totalPoints / entry.totalQuestions) * 10 : 0;
    });

    const data = {
        labels,
        datasets: [
            {
                label: "Score par thème",
                data: dataValues,
                backgroundColor: [
                    "#FFD700", // jaune (Gold)
                    "#FF4500", // rouge (Orange-Red)
                    "#CE27C5", // secondary pink (Rose/Magenta)
                    "#8A2BE2", // violet (Blue Violet)
                    "#00CED1", // cyan (Dark Turquoise)
                    "#35FF69", // primary green (Vert)
                ],
                borderWidth: 1,
            }
        ],
    };

    // ==== Options pour le chart ====
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "70%", // épaisseur du doughnut
        plugins: {
            legend: { position: "right", labels: { color: "#F6F4F3" } },
            title: { display: true, text: "Scores par thème", color: "#F6F4F3", font: { size: 16 }, padding: { bottom: 20 } },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const theme = THEMES[context.dataIndex];
                        const entry = scoresByTheme[theme];
                        const score = entry.totalQuestions > 0 ? ((entry.totalPoints / entry.totalQuestions) * 10).toFixed(1) : 0;
                        return `${THEME_MAP[theme]}: ${score}`;
                    }
                }
            }
        }
    };

    return <Doughnut data={data} options={options} />;
}
