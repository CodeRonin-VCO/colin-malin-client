import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

// Atom for token (localStorage)
export const tokenAtom = atomWithStorage("authToken", null);

// Atom user info (localStorage)
export const userAtom = atomWithStorage("user", null);

// Atom for state connexion
export const isAuthenticatedAtom = atom((get) => !!get(tokenAtom));