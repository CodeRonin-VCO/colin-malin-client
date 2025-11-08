/**
 * Mélange aléatoirement les éléments d'un tableau (algorithme de Fisher-Yates).
 * @param {Array} array - Le tableau à mélanger.
 * @returns {Array} Une nouvelle instance du tableau mélangé.
 */
export function shuffleAnswers(array) {
    if (!Array.isArray(array)) return [];

    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}
