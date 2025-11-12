import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Filler } from "chart.js";
import { Line } from "react-chartjs-2";

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

// Fonction pour formater les dates
function formatShortDate(isoDate) {
    const date = new Date(isoDate);
    const day = date.getDate();
    const monthShort = date.toLocaleString('fr-BE', { month: 'short' });
    return `${day} ${monthShort}.`;
}

export default function ProgressByDateChart() {
    // todo: change fake data by db data
    // Fake data
    const isoDates = [
        "2025-11-01",
        "2025-11-02",
        "2025-11-03",
        "2025-11-04",
        "2025-11-05",
        "2025-11-06",
        "2025-11-07",
    ];

    const dates = ["", ...isoDates.map((date) => formatShortDate(date))];

    const testScores = [
        { correct: 7, total: 10 },
        { correct: 5, total: 8 },
        { correct: 9, total: 10 },
        { correct: 6, total: 10 },
        { correct: 8, total: 10 },
        { correct: 10, total: 10 },
        { correct: 4, total: 5 }
    ];

    const scores = [0, ...testScores.map((test) => (test.correct / test.total) * 10)];


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
                        const score = testScores[index - 1]; // Décalage nécessaire
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