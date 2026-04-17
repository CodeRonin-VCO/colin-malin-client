import { THEME_MAP, translateArray, translateValue } from "./translate-mapping.js";
import { describe, expect, test } from "@jest/globals";

// --- translateValue ---
describe("translateValue", () => {
    const mockup = { ...THEME_MAP };

    // ==== Cas valides ====
    test("renvoie valeur mockup", () => {
        expect(translateValue("history", mockup)).toBe("Histoire");
    });

    // ==== Cas invalides ====
    test("valeur n'existe pas dans le mockup", () => {
        expect(translateValue("bonjour", mockup)).toBe("bonjour");
    });

    // ==== Cas limites ====
    test("string vide", () => {
        expect(translateValue("", mockup)).toBe("");
    });

    test("null", () => {
        expect(translateValue(null, mockup)).toBe(null);
    });

    test("undefined", () => {
        expect(translateValue(undefined, mockup)).toBe(undefined);
    });
})



// --- translateArray ---
describe("translateArray", () => {
    const mockup = { ...THEME_MAP };

    // ==== Cas valides ====
    test("Clefs connues", () => {
        expect(translateArray(["history", "culture", "sport"], mockup)).toBe("Histoire, Culture, Sport");
    });

    // ==== Cas invalides ====
    test("Clefs inconnues", () => {
        expect(translateArray(["bonjour", "howdy", "welcome"], mockup)).toBe("bonjour, howdy, welcome");
    });

    test("Tableau mixte", () => {
        expect(translateArray(["bonjour", "history", "welcome"], mockup)).toBe("bonjour, Histoire, welcome");
    });

    test("Tableau vide", () => {
        expect(translateArray([], mockup)).toBe("");
    });

    // ==== Cas limites ====
    test.each([
        ["bonjour", "rejette string"],
        [null, "rejette null"],
        [undefined, "rejette undefined"],
        [123456789, "rejette number"],
    ])('Rejette "%s" (%s)', (value) => {
        expect(translateArray(value, mockup)).toBe("Aucune valeur");
    });
})
