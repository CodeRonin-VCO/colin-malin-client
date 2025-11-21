import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip } from "chart.js";
import { Bar } from "react-chartjs-2";
import useScores from "../../../../hooks/useScores.js";
import { useEffect, useState } from "react";
import { DIFFICULTY_MAP } from "../../../../utils/translate-mapping.js";

// ==== Chart.js ====
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
)

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


export default function ProgressByDifficultyChart() {
    const { fetchScoreByUserId } = useScores();
    const [scoresData, setScoresData] = useState([]);

    useEffect(() => {
        const loadScores = async () => {
            try {
                const { startDate, endDate } = getLastMonthDates();
                const result = await fetchScoreByUserId(null, null, startDate, endDate);
                setScoresData(result.response.scores);

            } catch (error) {
                console.error("Erreur chargement scores:", error);
            };
        };

        loadScores();

    }, [])

    // ==== Initialisation des difficultés ====
    const difficulties = ["low", "medium", "high", "all"];
    const scoresByDiff = difficulties.reduce((acc, diff) => {
        acc[diff] = { totalPoints: 0, totalQuestions: 0 };
        return acc;
    }, { all: { totalPoints: 0, totalQuestions: 0 } });

    // ==== Remplissage des scores ====
    scoresData.forEach(score => {
        const diff = score.difficulty ?? "Unknown";
        if (!scoresByDiff[diff]) scoresByDiff[diff] = { totalPoints: 0, totalQuestions: 0 };
        scoresByDiff[diff].totalPoints += score.points;
        scoresByDiff[diff].totalQuestions += score.nb_questions;

        // Ajouter à "all"
        scoresByDiff.all.totalPoints += score.points;
        scoresByDiff.all.totalQuestions += score.nb_questions;
    });

    // ==== Préparer les données pour Chart.js ====
    const labels = difficulties.map(diff => DIFFICULTY_MAP[diff]);
    const dataValues = difficulties.map(diff => {
        const entry = scoresByDiff[diff];
        return entry.totalQuestions > 0 ? (entry.totalPoints / entry.totalQuestions) * 10 : 0;
    });
    const data = {
        labels,
        datasets: [{
            label: "Score moyen",
            data: dataValues,
            backgroundColor: [
                "#FFD700",
                "#FF4500",
                "#CE27C5",
                "#00CED1",
            ],
            barThickness: 20, // épaisseur des barres
        }],
        
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            title: { display: true, text: 'Progrès par difficulté', color: "#F6F4F3", font: { size: 16 }, padding: { top: 10, bottom: 40 } },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const diffKey = difficulties[context.dataIndex];
                        const entry = scoresByDiff[diffKey];
                        const score = entry.totalQuestions > 0 ? ((entry.totalPoints / entry.totalQuestions) * 10).toFixed(1) : 0;
                        return `Score: ${score}`;
                    },
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                suggestedMax: 10,
                ticks: {
                    callback: (value) => `${value * 10}%`, // Affiche 0%, 10%, ..., 100%
                    color: "#35FF69", // Couleur des labels de l'axe Y
                },
                grid: {
                    color: "rgba(53, 255, 105, 0.1)", // Couleur des lignes de quadrillage
                    lineWidth: 1, // Épaisseur des lignes de quadrillage
                }
            },
            x: {
                ticks: {
                    color: "#35FF69", // Couleur des labels de l'axe X
                },
                grid: {
                    color: "rgba(53, 255, 105, 0.1)", // Couleur des lignes de quadrillage
                    lineWidth: 1, // Épaisseur des lignes de quadrillage
                },
            },
        },
    };

    return (
        <>
            <Bar data={data} options={options} />
        </>
    )
}