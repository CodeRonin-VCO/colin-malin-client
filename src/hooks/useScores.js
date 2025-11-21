import { useAtom } from "jotai";
import { useState } from "react";
import { gameConfigAtom, questionsAtom, tokenAtom, userAtom } from "../atom/atom.js";
import * as scoresService from "../services/scores.service.js";
import { useNavigate } from "react-router";
import { handleExpiredToken } from "../utils/expiredToken.js";


export default function useScores() {
    const [token, setToken] = useAtom(tokenAtom);
    const [user, setUser] = useAtom(userAtom);
    const [gameConfig, setGameConfig] = useAtom(gameConfigAtom);
    const [questions, setQuestions] = useAtom(questionsAtom);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const fetchAddResults = async (game_id, points, time_spent, category_scores, answers) => {
        setIsLoading(true);

        try {
            const response = await scoresService.addResults(token, user.user_id, game_id, points, time_spent, category_scores, answers);

            return { success: true, response };

        } catch (error) {
            const isTokenExpired = handleExpiredToken(error, setToken, setUser, navigate)
            if (!isTokenExpired) throw error;

        } finally {
            setIsLoading(false);
        };
    }

    const fetchFilteredResults = async (theme, difficulty, best) => {
        setIsLoading(true);

        try {
            const response = await scoresService.filteredResults(token, user.user_id, theme, difficulty, best);

            return { success: true, response };

        } catch (error) {
            const isTokenExpired = handleExpiredToken(error, setToken, setUser, navigate)
            if (!isTokenExpired) throw error;
            
        } finally {
            setIsLoading(false);
        };
    }

    const fetchScoreByUserId = async (theme, difficulty, startDate, endDate) => {
        setIsLoading(true);

        try {
            const response = await scoresService.scoreByUserId(token, user.user_id, theme, difficulty, startDate, endDate);

            return { success: true, response };

        } catch (error) {
            const isTokenExpired = handleExpiredToken(error, setToken, setUser, navigate)
            if (!isTokenExpired) throw error;
            
        } finally {
            setIsLoading(false);
        };
    }

    return {
        fetchAddResults,
        fetchFilteredResults,
        fetchScoreByUserId,
    }
}