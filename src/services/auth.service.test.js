import { afterEach, describe, expect, jest, test } from "@jest/globals";
// Doit être placé avant les imports à tester (lié à l'utilisation des modules)
jest.unstable_mockModule("./apiClient.js", () => ({
    fetchJson: jest.fn()
}));

// Les imports doivent être dynamiques (après le mock)
const { register, login, logOut, updatePassword } = await import("./auth.service.js");
const apiClient = await import("./apiClient.js");


afterEach(() => {
    apiClient.fetchJson.mockClear();
});

describe("register", () => {
    test("appelle fetchJson avec la bonne URL et méthode POST", async () => {
        apiClient.fetchJson.mockResolvedValueOnce({ id: 1 });

        await register("test", "test@exemple.be", "Bonjour123=");

        expect(apiClient.fetchJson).toHaveBeenCalledWith(
            "/auth/register",
            expect.objectContaining({
                method: "POST",
                body: {
                    username: "test",
                    email: "test@exemple.be",
                    password: "Bonjour123="
                }
            })
        );
    });
})

describe("login", () => {
    test("appelle fetchJson avec la bonne URL et méthode POST", async () => {
        apiClient.fetchJson.mockResolvedValueOnce({ id: 1 });

        await login("test@exemple.be", "Bonjour123=");

        expect(apiClient.fetchJson).toHaveBeenCalledWith(
            "/auth/login",
            expect.objectContaining({
                method: "POST",
                body: {
                    email: "test@exemple.be",
                    password: "Bonjour123="
                }
            })
        );
    });
})

describe("updatePassword", () => {
    test("appelle fetchJson avec la bonne URL et méthode PUT", async () => {
        apiClient.fetchJson.mockResolvedValueOnce({ id: 1 });

        await updatePassword("test@exemple.be", "Bonjour123=", "Bonjour456=");

        expect(apiClient.fetchJson).toHaveBeenCalledWith(
            "/auth/update-pwd",
            expect.objectContaining({
                method: "PUT",
                body: {
                    email: "test@exemple.be",
                    oldPassword: "Bonjour123=",
                    newPassword: "Bonjour456="
                }
            })
        );
    });
})


describe("logOut", () => {
    test("retourne une promesse résolue", async () => {
        await expect(logOut()).resolves.not.toThrow();
    });
})