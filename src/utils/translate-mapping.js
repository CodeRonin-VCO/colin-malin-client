
const THEME_MAP = {
    history: "Histoire",
    biology: "Biologie",
    sciences: "Sciences",
    culture: "Culture",
    sport: "Sport",
    geography: "Géographie",
    sociology: "Sociologie",
    anecdotes: "Anecdotes",
    mix: "Tous les thèmes",
};

const DIFFICULTY_MAP = {
    all: "Toutes",
    high: "Élevée",
    medium: "Moyenne",
    low: "Faible",
};

const TYPE_MAP = {
    solo: "Solo",
    multi: "Multijoueur",
};

// Fonction pour traduire une valeur selon un mapping donné
export const translateValue = (value, map) => {
    return map[value] || value;
};

// Fonction pour traduire un tableau de valeurs (ex: thèmes)
export const translateArray = (values, map) => {
    if (!Array.isArray(values)) return "Aucune valeur";
    return values.map((value) => translateValue(value, map)).join(", ");
};

export { THEME_MAP, DIFFICULTY_MAP, TYPE_MAP };