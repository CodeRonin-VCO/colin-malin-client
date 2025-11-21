const baseURL = "http://localhost:8008/api/scores";

export const addResults = async (token, user_id, game_id, points, time_spent, category_scores, answers) => {
    const response = await fetch(`${baseURL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ user_id, game_id, points, time_spent, category_scores, answers })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || errorData.message || "Echec de la création du score.");
    };

    return response.json();
};

export const filteredResults = async (token, user_id, theme, difficulty, best) => {
    const params = new URLSearchParams();
    if (user_id) params.append("user_id", user_id);
    if (theme) params.append("theme", theme);
    if (difficulty) params.append("difficulty", difficulty);
    if (best) params.append("best", best);

    const response = await fetch(`${baseURL}?${params.toString()}`, {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
    });

    if (!response.ok) {
        const errorData = await response.json();
        // SI l’erreur est "aucun score", on renvoie un tableau vide au lieu de throw
        if (errorData?.message?.includes("Aucun score")) {
            return { scores: [] };
        };

        throw new Error(errorData.error || errorData.message || "Echec de la récupération des scores filtrés.");
    };

    return response.json();
};

export const scoreByUserId = async (token, user_id, theme, difficulty, startDate, endDate) => {
    const params = new URLSearchParams();
    if (theme) params.append("theme", theme);
    if (difficulty) params.append("difficulty", difficulty);
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);

    const response = await fetch(`${baseURL}/${user_id}?${params.toString()}`, {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
    });

    if (!response.ok) {
        const errorData = await response.json();
        if (errorData?.message?.includes("Aucun score")) {
            // IMPORTANT : renvoyer des données vides pour éviter que les charts plantent
            return { scores: [] };
        }
        
        throw new Error(errorData.error || errorData.message || "Echec de la récupération des scores filtrés.");
    };

    return response.json();
};