import { passwordRegex, validatePassword } from "./validation.js";
import { describe, expect, test } from "@jest/globals";

// ==== Cas valides ====
describe("validatePassword", () => {
    test("accepte un mot de passe avec majuscule, chiffre et caractère spécial", () => {
        expect(validatePassword("Bonjour1!")).toBe(true);
    });

    test("accepte exactement 8 caractères", () => {
        expect(validatePassword("Abdcef1!")).toBe(true);
    });

    test("accepte un mot de passe long", () => {
        expect(validatePassword("MonMotDePasse123!@#")).toBe(true);
    });

    test("accepte différents caractères spéciaux", () => {
        expect(validatePassword("Password1@")).toBe(true);
        expect(validatePassword("Password1#")).toBe(true);
        expect(validatePassword("Password1$")).toBe(true);
    })
})

// ==== Cas invalides ====
describe("mots de passe invalides", () => {
    test("rejette un mot de passe trop court (<8 char)", () => {
        expect(validatePassword("Ab1!")).toBe(false);
    });

    test("rejette un mot de passe sans majuscule", () => {
        expect(validatePassword("bonjour1!")).toBe(false);
    });

    test("rejette un mot de passe sans chiffre", () => {
        expect(validatePassword("Bonjour!!")).toBe(false);
    });

    test("rejette un mot de passe sans caractère spécial", () => {
        expect(validatePassword("Bonjour123")).toBe(false);
    });

    test("rejette une chaîne vide", () => {
        expect(validatePassword("")).toBe(false);
    });
})

// ==== Cas limites ====
describe("edge cases", () => {
    test("rejette null", () => {
        expect(validatePassword(null)).toBe(false);
    });

    test("rejette undefined", () => {
        expect(validatePassword(undefined)).toBe(false);
    });

    test("rejette number", () => {
        expect(validatePassword(123456789)).toBe(false);
    });
})

// ==== test de la regex ====
describe("vérification de passwordRegex", () => {
    test('est bien une instance de RegExp', () => {
      expect(passwordRegex).toBeInstanceOf(RegExp);
    });
});