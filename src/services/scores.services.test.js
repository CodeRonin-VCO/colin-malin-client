import { afterEach, describe, expect, jest, test } from "@jest/globals";
jest.unstable_mockModule("./apiClient.js", () => ({
    fetchJson: jest.fn()
}));

const { addResults, filteredResults, scoreByUserId } = await import("./scores.service.js");
const apiClient = await import("./apiClient.js");

afterEach(() => {
    apiClient.fetchJson.mockClear();
});

const FAKE_TOKEN = "dkeofogkrokgotkh";

describe("addResults", () => {
    test("Envoie les bonnes données (url, method, token, body)", async () => {
        apiClient.fetchJson.mockResolvedValueOnce({ id: 1 });
        await addResults(FAKE_TOKEN, "550e8400-e29b-41d4-a716-446655440000", "550e8400-e29b-41d4-a716-446655445656", 15, 46, { total: 5 }, {
            question_id: "660e8400-e29b-41d4-a716-446655440000",
            question: "Quel est",
            theme: ["sport"],
            difficulty: "high",
            correct_answer: "correct_answer",
            user_answer: "answer_user",
            is_correct: true,
            time_spent: 15
        });

        expect(apiClient.fetchJson).toHaveBeenCalledWith(
            "/scores",
            expect.objectContaining({
                method: "POST",
                token: FAKE_TOKEN,
                body: {
                    user_id: "550e8400-e29b-41d4-a716-446655440000",
                    game_id: "550e8400-e29b-41d4-a716-446655445656",
                    points: 15,
                    time_spent: 46,
                    category_scores: { total: 5 },
                    answers: {
                        question_id: "660e8400-e29b-41d4-a716-446655440000",
                        question: "Quel est",
                        theme: ["sport"],
                        difficulty: "high",
                        correct_answer: "correct_answer",
                        user_answer: "answer_user",
                        is_correct: true,
                        time_spent: 15
                    }
                }
            })
        )
    });
})

describe("filteredResults", () => {
    test("Envoie les bonnes données (url, method, token)", async () => {
        apiClient.fetchJson.mockResolvedValueOnce({ id: 1 });
        await filteredResults(FAKE_TOKEN, "550e8400-e29b-41d4-a716-446655440000", ["sport"], "high", true);

        expect(apiClient.fetchJson).toHaveBeenCalledWith(
            "/scores?user_id=550e8400-e29b-41d4-a716-446655440000&theme=sport&difficulty=high&best=true",
            expect.objectContaining({
                method: "GET",
                token: FAKE_TOKEN,
            })
        );
    });
})

describe("scoreByUserId", () => {
    test("Envoie les bonnes données (url, method, token)", async () => {
        apiClient.fetchJson.mockResolvedValueOnce({ id: 1 });
        await scoreByUserId(FAKE_TOKEN, "550e8400-e29b-41d4-a716-446655440000", ["sport"], "high", "2026-03-04", "2026-03-05");

        expect(apiClient.fetchJson).toHaveBeenCalledWith(
            "/scores/550e8400-e29b-41d4-a716-446655440000?theme=sport&difficulty=high&startDate=2026-03-04&endDate=2026-03-05",
            expect.objectContaining({
                method: "GET",
                token: FAKE_TOKEN,
            })
        );
    });
})