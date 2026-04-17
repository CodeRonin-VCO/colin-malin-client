import { afterEach, describe, expect, jest, test } from "@jest/globals";
jest.unstable_mockModule("./apiClient.js", () => ({
    fetchJson: jest.fn()
}));

const { getAll, getBySearch, create, filtered, getById, modify, deleteQuestion } = await import("./questions.service.js");
const apiClient = await import("./apiClient.js");

afterEach(() => {
    apiClient.fetchJson.mockClear();
});

describe("getAll", () => {
    test("Envoie les bonnes données (url, method, token, offset, limit)", async () => {
        apiClient.fetchJson.mockResolvedValueOnce({ id: 1 });
        await getAll("feokoekfoek", 20, 30);

        expect(apiClient.fetchJson).toHaveBeenCalledWith(
            "/questions?offset=20&limit=30",
            expect.objectContaining({
                method: "GET",
                token: "feokoekfoek"
            })
        );
    });
})

describe("getBySearch", () => {
    test("Envoie les bonnes données (url, method, token, query, offset, limit)", async () => {
        apiClient.fetchJson.mockResolvedValueOnce({ id: 1 });
        await getBySearch("feokoekfoek", "quel", 20, 30);

        expect(apiClient.fetchJson).toHaveBeenCalledWith(
            "/questions/search?query=quel&offset=20&limit=30",
            expect.objectContaining({
                method: "GET",
                token: "feokoekfoek"
            })
        );
    });
})

describe("create", () => {
    test("Envoie les bonnes données (url, method, token, questionData)", async () => {
        apiClient.fetchJson.mockResolvedValueOnce({ id: 1 });
        await create("feokoekfoek", {
            theme: "sport",
            question: "Quel est?",
            answers: ["res1", "res2", "res3", "res4"],
            correct_answer: "res1",
            difficulty: "high"
        });

        expect(apiClient.fetchJson).toHaveBeenCalledWith(
            "/questions",
            expect.objectContaining({
                method: "POST",
                token: "feokoekfoek",
                body: {
                    theme: "sport",
                    question: "Quel est?",
                    answers: ["res1", "res2", "res3", "res4"],
                    correct_answer: "res1",
                    difficulty: "high"
                }
            })
        )
    })
})

describe("filtered", () => {
    test("Envoie les bonnes données (url, method, token, body)", async () => {
        apiClient.fetchJson.mockResolvedValueOnce({ id: 1 });
        await filtered("feokoekfoek", {
            nb_questions: 5,
            theme: "sport",
            difficulty: "high",
            mode: "solo"
        });

        expect(apiClient.fetchJson).toHaveBeenCalledWith(
            "/questions/filtered",
            expect.objectContaining({
                method: "POST",
                token: "feokoekfoek",
                body: {
                    nb_questions: 5,
                    theme: "sport",
                    difficulty: "high",
                    mode: "solo"
                }
            })
        )
    })
})

describe("getById", () => {
    test("Envoie les bonnes données (url, method, token)", async () => {
        apiClient.fetchJson.mockResolvedValueOnce({ id: 1 });
        await getById("feokoekfoek", "550e8400-e29b-41d4-a716-446655440000");

        expect(apiClient.fetchJson).toHaveBeenCalledWith(
            "/questions/550e8400-e29b-41d4-a716-446655440000",
            expect.objectContaining({
                method: "GET",
                token: "feokoekfoek",
            })
        )
    })
})

describe("modify", () => {
    test("Envoie les bonnes données (url, method, token, body)", async () => {
        apiClient.fetchJson.mockResolvedValueOnce({ id: 1 });
        await modify("feokoekfoek", "550e8400-e29b-41d4-a716-446655440000", {
            theme: "sport",
            question: "Quel est?",
            answers: ["res1", "res2", "res3", "res4"],
            correct_answer: "res1",
            difficulty: "high"
        });

        expect(apiClient.fetchJson).toHaveBeenCalledWith(
            "/questions/550e8400-e29b-41d4-a716-446655440000",
            expect.objectContaining({
                method: "PUT",
                token: "feokoekfoek",
                body: {
                    theme: "sport",
                    question: "Quel est?",
                    answers: ["res1", "res2", "res3", "res4"],
                    correct_answer: "res1",
                    difficulty: "high"
                }
            })
        )
    })
})

describe("deleteQuestion", () => {
    test("Envoie les bonnes données (url, method, token)", async () => {
        apiClient.fetchJson.mockResolvedValueOnce({ id: 1 });
        await deleteQuestion("feokoekfoek", "550e8400-e29b-41d4-a716-446655440000");

        expect(apiClient.fetchJson).toHaveBeenCalledWith(
            "/questions/550e8400-e29b-41d4-a716-446655440000",
            expect.objectContaining({
                method: "DELETE",
                token: "feokoekfoek",
            })
        )
    })
})