const baseURL = "http://localhost:8008/api/questions";

export const getAll = async (token, offset, limit) => {
    const response = await fetch(`${baseURL}?offset=${offset}&limit=${limit}`, {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Echec de récupération des questions.");
    };

    return response.json();
};

export const getBySearch = async (token, query, offset, limit) => {
    const response = await fetch(`${baseURL}/search?query=${query}&offset=${offset}&limit=${limit}`, {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Echec de récupération des questions.");
    };

    return response.json();
};

export const create = async (token, questionData) => {
    const response = await fetch(`${baseURL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(questionData)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Echec de création de la question.");
    };

    return response.json();
};

export const filtered = async (token, config) => {
    const response = await fetch(`${baseURL}/filtered`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(config)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Echec de la récupération des questions filtrées.");
    };

    return response.json();
};

export const getById = async (token, question_id) => {
    const response = await fetch(`${baseURL}/${question_id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Echec de la récupération de la question.");
    };

    return response.json();
};

export const modify = async (token, question_id, updatedData) => {
    const response = await fetch(`${baseURL}/${question_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(updatedData)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Echec de la modification de la question.");
    };

    return response.json();
};

export const deleteQuestion = async (token, question_id) => {
    const response = await fetch(`${baseURL}/${question_id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Echec de la suppression de la question.");
    };

    return response.json();
};