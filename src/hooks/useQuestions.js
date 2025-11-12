import { useAtom } from "jotai";
import * as questionsService from "./../services/questions.service.js";
import { gameConfigAtom, questionsAtom, tokenAtom } from "../atom/atom.js";
import { useState } from "react";

export default function useQuestions() {
    const [token, setToken] = useAtom(tokenAtom);
    const [gameConfig, setGameConfig] = useAtom(gameConfigAtom);
    const [questions, setQuestions] = useAtom(questionsAtom);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const fetchGetAll = async (offset, limit) => {
        setIsLoading(true);
        try {
            const response = await questionsService.getAll(token, offset, limit);
            const { questions: newQuestions, total } = response;
            setQuestions(prev => offset === 0 ? newQuestions : [...prev, ...newQuestions]);
            setHasMore(offset + limit < total);

            return { success: true, response };

        } catch (error) {
            console.error("Erreur lors de la récupération des questions :", error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const fetchGetBySearch = async (query, offset, limit) => {
        setIsLoading(true);
        try {
            const response = await questionsService.getBySearch(token, query, offset, limit);
            const { questions } = response;
            setQuestions(questions);

            return { success: true, response };

        } catch (error) {
            console.error("Erreur lors de la récupération des questions :", error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const fetchCreate = async (questionData) => {
        try {
            const response = await questionsService.create(token, questionData);

            return { success: true, response };

        } catch (error) {
            throw error;
        }
    };

    const fetchFiltered = async () => {
        try {
            const response = await questionsService.filtered(token, gameConfig);
            console.log("Appel à fetchFiltered avec config :", gameConfig);
            setQuestions(response.questions);

            return { success: true, response };

        } catch (error) {
            throw error;
        }
    };

    const fetchGetById = async (question_id) => {
        try {
            const response = await questionsService.getById(token, question_id);

            return { success: true, response };

        } catch (error) {
            throw error;
        }
    };
    const fetchModify = async (question_id, updatedData) => {
        try {
            const response = await questionsService.modify(token, question_id, updatedData);

            return { success: true, response };

        } catch (error) {
            throw error;
        }
    };
    const fetchDelete = async (question_id) => {
        try {
            const response = await questionsService.deleteQuestion(token, question_id);

            return { success: true, response };

        } catch (error) {
            throw error;
        }
    };



    return {
        fetchGetAll,
        fetchGetBySearch,
        fetchCreate,
        fetchFiltered,
        fetchGetById,
        fetchModify,
        fetchDelete,
        hasMore,
        isLoading
    }
};