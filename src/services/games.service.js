const baseURL = "http://localhost:8008/api/games";

export const getGames = async (token) => {
    const response = await fetch(`${baseURL}`, {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Echec de la récupération de la partie.");
    };

    return response.json();
};

export const createGame = async (token, user_id, nb_questions, theme, difficulty, mode, questions) => {
    const response = await fetch(`${baseURL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ user_id, nb_questions, theme, difficulty, mode, questions })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Echec de la création de la partie.");
    };

    return response.json();
};

export const getGameById = async (token, game_id) => {
    const response = await fetch(`${baseURL}/${game_id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Echec de la récupération de la partie.");
    };

    return response.json();
};