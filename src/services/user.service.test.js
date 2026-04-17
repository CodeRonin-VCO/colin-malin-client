import { afterEach, describe, expect, jest, test } from "@jest/globals";
jest.unstable_mockModule("./apiClient.js", () => ({
    fetchJson: jest.fn()
}));

const { updateUser, getUser } = await import("./user.service.js");
const apiClient = await import("./apiClient.js");

afterEach(() => {
    apiClient.fetchJson.mockClear();
});

const FAKE_TOKEN = "dkeofogkrokgotkh";

describe("updateUser", () => {
    test("Envoie les bonnes données (url, method, token, body)", async () => {
        apiClient.fetchJson.mockResolvedValueOnce({ id: 1 });
        await updateUser(FAKE_TOKEN, {});

        expect(apiClient.fetchJson).toHaveBeenCalledWith(
            "/user",
            expect.objectContaining({
                method: "PUT",
                token: FAKE_TOKEN,
                body: {}
            })
        );
    });
})

describe("getUser", () => {
    test("Envoie les bonnes données (url, method, token)", async () => {
        apiClient.fetchJson.mockResolvedValueOnce({ id: 1 });
        await getUser(FAKE_TOKEN, {});

        expect(apiClient.fetchJson).toHaveBeenCalledWith(
            "/user",
            expect.objectContaining({
                method: "GET",
                token: FAKE_TOKEN
            })
        );
    });
})