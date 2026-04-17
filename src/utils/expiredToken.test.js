import { handleExpiredToken } from "./expiredToken.js";
import { describe, expect, jest, test } from "@jest/globals";


// ==== Cas valides ====
describe("handleExpiredToken — 401", () => {
    test("retourne true si error.status === 401", () => {
        expect(handleExpiredToken({ status: 401 }, jest.fn(), jest.fn(), jest.fn())).toBe(true);
    });
    test("appelle setToken(null) quand 401", () => {
        const setToken = jest.fn();
        handleExpiredToken({ status: 401 }, setToken, jest.fn(), jest.fn());
        expect(setToken).toHaveBeenCalledWith(null);
    });
    test("appelle setUser(null) quand 401", () => {
        const setUser = jest.fn();
        handleExpiredToken({ status: 401 }, jest.fn(), setUser, jest.fn());
        expect(setUser).toHaveBeenCalledWith(null);
    });
    test("appelle navigate('/') quand 401", () => {
        const navigate = jest.fn();
        handleExpiredToken({ status: 401 }, jest.fn(), jest.fn(), navigate);
        expect(navigate).toHaveBeenCalledWith("/");
    });
});

// ==== Cas invalides ====
describe("handleExpiredToken — pas 401", () => {
    test("retourne false si code !== 401", () => {
        expect(handleExpiredToken({ status: 404 }, jest.fn(), jest.fn(), jest.fn())).toBe(false);
    });
    test("n'appelle pas setToken si !== 401", () => {
        const setToken = jest.fn();
        handleExpiredToken({ status: 404 }, setToken, jest.fn(), jest.fn());
        expect(setToken).not.toHaveBeenCalled();
    });
    test("n'appelle pas setUser si !== 401", () => {
        const setUser = jest.fn();
        handleExpiredToken({ status: 404 }, jest.fn(), setUser, jest.fn());
        expect(setUser).not.toHaveBeenCalled();
    });
    test("n'appelle pas navigate si !== 401", () => {
        const navigate = jest.fn();
        handleExpiredToken({ status: 404 }, jest.fn(), jest.fn(), navigate);
        expect(navigate).not.toHaveBeenCalled();
    });
});

// ==== Cas limites ====
describe("handleExpiredToken — cas limites", () => {
    test("retourne false si error est null", () => {
        expect(handleExpiredToken(null, jest.fn(), jest.fn(), jest.fn())).toBe(false);
    });
    test("retourne false si error est undefined", () => {
        expect(handleExpiredToken(undefined, jest.fn(), jest.fn(), jest.fn())).toBe(false);
    });
    test("retourne false si error.status est une string", () => {
        expect(handleExpiredToken({ status: "hello" }, jest.fn(), jest.fn(), jest.fn())).toBe(false);
    });
    test("retourne false si error n'a pas de propriété status", () => {
        expect(handleExpiredToken({ noStatus: 401 }, jest.fn(), jest.fn(), jest.fn())).toBe(false);
    });
});