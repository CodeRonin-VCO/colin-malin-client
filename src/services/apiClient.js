"use strict";

export class HttpError extends Error {
    constructor(status, message, body = null) {
        super(message);
        this.name = "HttpError";
        this.status = status;
        this.body = body;
    }
}


export async function fetchJson(path, { method = "GET", token, body } = {}) {
    const url = `${import.meta.env.VITE_API_URL}${path}`;
    console.log("FETCH URL:", url);

    const res = await fetch(url, {
        method,
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: body ? JSON.stringify(body) : undefined
    });

    let data = null;

    try {
        data = await res.json();
    } catch {
        data = null; // réponse vide ou non-JSON
    }

    if (!res.ok) {
        throw new HttpError(
            res.status,
            data?.message || res.statusText,
            data
        );
    }

    return data;
}