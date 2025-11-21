import { useAtom } from "jotai";
import * as userService from "./../services/user.service.js";
import { tokenAtom, userAtom } from "../atom/atom.js";
import { handleExpiredToken } from "../utils/expiredToken.js";
import { useNavigate } from "react-router";

export default function useUser() {
    const [token, setToken] = useAtom(tokenAtom);
    const [setUser] = useAtom(userAtom);
    const navigate = useNavigate();

    const fetchUpdateUser = async (updates) => {
        try {
            await userService.updateUser(token, updates);

        } catch (error) {
            const isTokenExpired  = handleExpiredToken(error, setToken, setUser, navigate)
            if (!isTokenExpired ) throw error;
        }
    };

    const fetchGetUser = async () => {
        try {
            const response = await userService.getUser(token);
            return response.user;
        } catch (error) {
            const isTokenExpired  = handleExpiredToken(error, setToken, setUser, navigate)
            if (!isTokenExpired ) throw error;
        }
    };

    return {
        fetchUpdateUser,
        fetchGetUser,
    }
}