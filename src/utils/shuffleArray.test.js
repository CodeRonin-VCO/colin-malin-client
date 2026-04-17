import { shuffleArray } from "./shuffleArray.js";
import { describe, expect, test } from "@jest/globals";


// ==== Cas valides ====
describe("shuffleArray", () => {
    test("Retourne un tableau", () => {
        expect(shuffleArray(["Bonjour", "Hello", "Howdy"])).toBeInstanceOf(Array);
    });

    test("Est un tableau de même longueur", () => {
        const original = [1, 2, 3];
        expect(shuffleArray(original).length).toBe(original.length);
    });

    test("Contient les mêmes éléments que l'original", () => {
        expect(shuffleArray([1, 2, 3])).toEqual(expect.arrayContaining([1, 2, 3]));
    })
})

// ==== Cas invalides ====
describe("retourne []", () => {
    test.each([
        [null, "Rejette null"],
        [undefined, "Rejette undefined"],
        ["Hello", "Rejette string"],
        [123456789, "Rejette number"],
    ])('Rejette "%s" (%s)', (value) => {
        expect(shuffleArray(value)).toEqual([]);
    });
})

// ==== Cas limites ====
describe("Cas limite de shuffleArray", () => {
    test("tableau vide", () => {
        expect(shuffleArray([])).toEqual([]);
    });

    test("tableau avec un seul élément", () => {
        expect(shuffleArray(["Hello"])).toEqual(["Hello"]);
    });

    test("retourne une nouvelle instance", () => {
        const original = ["Bonjour", "Hello", "Howdy"]
        expect(shuffleArray(original)).not.toBe(original);
    });
})