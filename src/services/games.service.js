import { fetchJson } from "./apiClient.js";


export const getGames = (token) => fetchJson("/games", {
    method: "GET",
    token,
});

export const createGame = (token, user_id, nb_questions, theme, difficulty, mode, questions) => fetchJson("/games", {
    method: "POST",
    token,
    body: { user_id, nb_questions, theme, difficulty, mode, questions }
});

export const getGameById = (token, game_id) => fetchJson(`/games/${game_id}`, {
    method: "GET",
    token
});