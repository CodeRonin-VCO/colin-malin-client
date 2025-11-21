import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

// Atom for token (localStorage)
export const tokenAtom = atomWithStorage("authToken", null);

// Atom user info (localStorage)
export const userAtom = atomWithStorage("user", null);

// Atom for state connexion
export const isAuthenticatedAtom = atom((get) => !!get(tokenAtom));

// Atom for game config
export const gameConfigAtom = atomWithStorage("gameConfig", null);

// Atom for questions
export const questionsAtom = atomWithStorage("questions", []);