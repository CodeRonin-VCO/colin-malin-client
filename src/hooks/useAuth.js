// src/hooks/useAuth.js
import { useAtom } from "jotai";
import * as authService from "./../services/auth.service.js";
import * as userService from "./../services/user.service.js";
import { tokenAtom, userAtom } from "../atom/atom.js";
import useUser from "./useUser.js";

export default function useAuth() {
    const [token, setToken] = useAtom(tokenAtom);
    const [user, setUser] = useAtom(userAtom);

    const fetchRegister = async (username, email, password) => {
        try {
            const { user: newUser } = await authService.register(username, email, password);
            await fetchLogin(email, password);
            return { success: true, user: newUser };

        } catch (error) {
            throw error;
        };
    };

    const fetchLogin = async (email, password) => {
        try {
            const { token, user: userData } = await authService.login(email, password);
            setToken(token);

            let completeUser = userData;

            if (token && userData) {
                const fullUserFetched = await userService.getUser(token);
                completeUser = {...userData, ...fullUserFetched.user}
            }
            setUser(completeUser);

            return { success: true };

        } catch (error) {
            throw error;
        }
    };

    const fetchLogout = async () => {
        try {
            await authService.logOut();

        } finally {
            setToken(null);
            setUser(null);
        }
    };

    const fetchUpdatePassword = async (oldPassword, newPassword) => {
        try {
            await authService.updatePassword(user.email, oldPassword, newPassword);

        } catch (error) {
            throw error;
        }
    };

    return {
        isAuthenticated: !!token,
        token,
        user,
        fetchLogin,
        fetchLogout,
        fetchRegister,
        fetchUpdatePassword
    };
};
