import { afterEach, describe, expect, jest, test } from "@jest/globals";
jest.unstable_mockModule("./apiClient.js", () => ({
    fetchJson: jest.fn()
}));

const { getGames, createGame, getGameById } = await import("./games.service.js");
const apiClient = await import("./apiClient.js");

afterEach(() => {
    apiClient.fetchJson.mockClear();
});

describe("getGames", () => {
    test("Envoie les bonnes données (url, method, token)", async () => {
        apiClient.fetchJson.mockResolvedValueOnce({ id: 1 });

        await getGames("feokoekoeirjdd");

        expect(apiClient.fetchJson).toHaveBeenCalledWith(
            "/games",
            expect.objectContaining({
                method: "GET",
                token: "feokoekoeirjdd"
            })
        )
    });
})

describe("createGame", () => {
    test("Envoie les bonnes données (url, method, token, body)", async () => {
        apiClient.fetchJson.mockResolvedValueOnce({ id: 1 });

        await createGame("feokoekoeirjdd", 1, 5, ["history", "sport"], "high", "solo", [1, 2, 3]);

        expect(apiClient.fetchJson).toHaveBeenCalledWith(
            "/games",
            expect.objectContaining({
                method: "POST",
                token: "feokoekoeirjdd",
                body: {
                    user_id: 1,
                    nb_questions: 5,
                    theme: ["history", "sport"],
                    difficulty: "high",
                    mode: "solo",
                    questions: [1, 2, 3]
                }
            })
        )
    });
})

describe("getGameById", () => {
    test("Envoie les bonnes données (url, method, token)", async () => {
        apiClient.fetchJson.mockResolvedValueOnce({ id: 1 });

        await getGameById("feokoekoeirjdd", 1);

        expect(apiClient.fetchJson).toHaveBeenCalledWith(
            "/games/1",
            expect.objectContaining({
                method: "GET",
                token: "feokoekoeirjdd"
            })
        );
    });
})