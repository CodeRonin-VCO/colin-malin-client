import { useAtom } from "jotai";
import { tokenAtom, userAtom } from "../atom/atom.js";
import { useState } from "react";
import * as gamesService from "./../services/games.service.js";
import { useNavigate } from "react-router";
import { handleExpiredToken } from "../utils/expiredToken.js";


export default function useGames() {
    const [token, setToken] = useAtom(tokenAtom);
    const [user, setUser] = useAtom(userAtom);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const fetchGetGames = async () => {
        setIsLoading(true);
        try {
            const response = await gamesService.getGames(token);
            const { totalCountGames, totalCountQuestions, totalCorrectAnswers } = response;

            return { success: true, response, totalCountGames, totalCountQuestions, totalCorrectAnswers };

        } catch (error) {
            const isTokenExpired = handleExpiredToken(error, setToken, setUser, navigate)
            if (!isTokenExpired) throw error;
            
        } finally {
            setIsLoading(false);
        };
    };

    const fetchCreateGame = async (nb_questions, theme, difficulty, mode, questions) => {
        setIsLoading(true);


        try {
            const response = await gamesService.createGame(token, user.user_id ?? user.id, nb_questions, theme, difficulty, mode, questions);

            return { success: true, response };

        } catch (error) {
            const isTokenExpired = handleExpiredToken(error, setToken, setUser, navigate)
            if (!isTokenExpired) throw error;
            
        } finally {
            setIsLoading(false);
        };
    };

    const fetchGetGameById = async (game_id) => {
        setIsLoading(true);

        try {
            const response = await gamesService.getGameById(token, game_id);

            return { success: true, response };

        } catch (error) {
            const isTokenExpired = handleExpiredToken(error, setToken, setUser, navigate)
            if (!isTokenExpired) throw error;
            
        } finally {
            setIsLoading(false)
        };
    };

    return {
        fetchGetGames,
        fetchCreateGame,
        fetchGetGameById
    }
}