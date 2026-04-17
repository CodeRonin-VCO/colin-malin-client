import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Filler } from "chart.js";
import { Line } from "react-chartjs-2";
import useScores from "../../../../hooks/useScores.js";
import { useEffect, useState } from "react";

// ==== Chart.js ====
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler
)

// ==== Fonction pour formater les dates ====
function formatShortDate(isoDate) {
    const date = new Date(isoDate);
    const day = date.getDate();
    const monthShort = date.toLocaleString('fr-BE', { month: 'short' });
    return `${day} ${monthShort}.`;
};

// ==== Fonction pour calculer le premier et le dernier jour du mois passé==== 
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


export default function ProgressByDateChart() {
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

    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const dates = ["", ...scoresData.map((s) => formatShortDate(s.created_at))];
    const scores = [0, ...scoresData.map((s) => (s.points / s.nb_questions) * 10)];


    const data = {
        labels: dates, // date en abcisse
        datasets: [{
            label: "",
            data: scores, // score en ordonnée
            borderColor: "rgba(206, 39, 197, .5)",
            backgroundColor: "#CE27C5",
            borderWidth: 2, // taille de la ligne
            pointRadius: 5, // taille des points
            tension: 0.3,
            fill: false
        }]
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            title: { display: true, text: 'Progrès par date', color: "#F6F4F3", font: { size: 16 }, padding: { top: 10, bottom: 40 } },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const index = context.dataIndex;
                        if (index === 0) return "";
                        const score = scoresData[index - 1]; // Décalage nécessaire
                        return `Score: ${score.correct}/${score.total}`;
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
            <Line data={data} options={options} />
        </>
    )
}