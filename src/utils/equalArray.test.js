import { arraysEqual } from "./equalArray.js";
import { describe, expect, test } from "@jest/globals";

// ==== Cas valides ====
describe("equalArray", () => {
    test("Accepte deux tableaux identiques", () => {
        expect(arraysEqual([1, 2, 3], [1, 2, 3])).toBe(true);
    });

    test("Accepter des tableaux vide", () => {
        expect(arraysEqual([], [])).toBe(true);
    });

    test("Tableau avec un seul élément identique", () => {
        expect(arraysEqual([1], [1])).toBe(true);
    });
})

// ==== Cas invalides ====
describe("!equalArray", () => {
    test("Tableau de longueur différente", () => {
        expect(arraysEqual([1, 2, 3], [1, 2])).toBe(false);
    });

    test("Même longueur mais valeurs différentes", () => {
        expect(arraysEqual([1, 2, 3], [3, 4, 5])).toBe(false);
    });

    test("Ordre différent", () => {
        expect(arraysEqual([1, 2, 3], [3, 2, 1])).toBe(false);
    });
})

// ==== Cas limites ====
describe("Cas limite de arraysEqual", () => {
    test("rejette null à la place d'un tableau", () => {
        expect(arraysEqual([1, 2, 3], null)).toBe(false);
    });

    test("rejette undefined à la place d'un tableau", () => {
        expect(arraysEqual([1, 2, 3], undefined)).toBe(false);
    });

    test("rejette string à la place d'un tableau", () => {
        expect(arraysEqual([1, 2, 3], "bonjour")).toBe(false);
    });

    test("rejette tableau de types mixtes", () => {
        expect(arraysEqual([1, 2, 3], [1, "bonjour", false])).toBe(false);
    });

    test("rejette deux strings identiques", () => {
        expect(arraysEqual("abc", "abc")).toBe(false);
    });
})