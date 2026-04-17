import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import { fetchJson, HttpError } from "./apiClient.js";

// Mock global.fetch
global.fetch = jest.fn();

function mockResponse(status, data, ok = true) {
    fetch.mockResolvedValueOnce({
        ok,
        status,
        statusText: "OK",
        json: jest.fn().mockResolvedValueOnce(data)
    })
}

describe("HttpError", () => {
    test("HttpError est une instance de Error", () => {
        const err = new HttpError(404, "Not Found");
        expect(err).toBeInstanceOf(Error);
    });

    test("HttpError a les bonnes propriétés", () => {
        const err = new HttpError(401, "Non autorisé", { detail: "token expiré" });
        expect(err.name).toBe("HttpError");
        expect(err.status).toBe(401);
        expect(err.message).toBe("Non autorisé");
        expect(err.body).toEqual({ detail: "token expiré" });
    });

    test("HttpError a un body null par défaut", () => {
        const err = new HttpError(500, "Erreur serveur");
        expect(err.body).toBeNull();
    });
})

describe("fetchJson", () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    test("retourne les données si la réponse est ok", async () => {
        mockResponse(200, { id: 1, username: "Alice" });
        const result = await fetchJson("/users/1", { token: "abc123" });
        expect(result).toEqual({ id: 1, username: "Alice" });
    });

    test("envoie le bon Content-Type", async () => {
        mockResponse(200, {});
        await fetchJson("/test");
        expect(fetch).toHaveBeenCalledWith(
            expect.any(String),
            expect.objectContaining({
                headers: expect.objectContaining({
                    "Content-Type": "application/json"
                })
            })
        );
    });

    test("ajoute le header Authorization si token fourni", async () => {
        mockResponse(200, {});
        await fetchJson("/test", { token: "mon-token" });
        expect(fetch).toHaveBeenCalledWith(
            expect.any(String),
            expect.objectContaining({
                headers: expect.objectContaining({
                    Authorization: "Bearer mon-token"
                })
            })
        );
    });

    test("n'ajoute pas Authorization si pas de token", async () => {
        mockResponse(200, {});
        await fetchJson("/test");
        const callArgs = fetch.mock.calls[0][1];
        expect(callArgs.headers).not.toHaveProperty("Authorization");
    });

    // ==== Cas invalides ====
    test("lance une HttpError si la réponse n'est pas ok", async () => {
        mockResponse(404, { message: "Non trouvé" }, false);
        // expect().rejects — façon Jest de tester les erreurs async
        await expect(fetchJson("/inexistant")).rejects.toThrow(HttpError);
    });

    test("HttpError a le bon status", async () => {
        mockResponse(401, { message: "Non autorisé" }, false);
        await expect(fetchJson("/protected")).rejects.toMatchObject({
            status: 401,
            message: "Non autorisé"
        });
    });
})