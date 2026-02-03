import { fetchJson } from "./apiClient.js";

export const addResults = (token, user_id, game_id, points, time_spent, category_scores, answers) => fetchJson(`/scores`, {
    method: "POST",
    token,
    body: { user_id, game_id, points, time_spent, category_scores, answers }
});

export const filteredResults = (token, user_id, theme, difficulty, best) => {
    const params = new URLSearchParams();
    if (user_id) params.append("user_id", user_id);
    if (theme) params.append("theme", theme);
    if (difficulty) params.append("difficulty", difficulty);
    if (best) params.append("best", best);

    return fetchJson(`/scores?${params.toString()}`, {
        method: "GET",
        token,
    })
};

export const scoreByUserId = (token, user_id, theme, difficulty, startDate, endDate) => {
    const params = new URLSearchParams();
    if (theme) params.append("theme", theme);
    if (difficulty) params.append("difficulty", difficulty);
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);

    return fetchJson(`/scores/${user_id}?${params.toString()}`, {
        method: "GET",
        token,
    })
};