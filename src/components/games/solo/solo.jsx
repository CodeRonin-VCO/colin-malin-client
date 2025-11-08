import { useAtom } from "jotai";
import styles from "./solo.module.css";
import { gameConfigAtom } from "../../../atom/atom.js";
import { useEffect, useRef, useState } from "react";

export default function SoloGame() {
    const [gameConfig] = useAtom(gameConfigAtom); //nb_question, difficulty, [theme], mode,
    // todo: connexion to db
    // const questions = await getFilteredQuestions(gameConfig);
    
    // Question en cours
    const [questionCount, setQuestionCount] = useState(0);
    
    // Cliquer sur une réponse
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    
    // Vérifier la réponse
    const [isCorrect, setIsCorrect] = useState(null);
    
    // Timer
    const [timer, setTimer] = useState(10);
    const timeRef = useRef(null);
    
    useEffect(() => {
        // Init timer
        setTimer(10);

        // Nettoie l'intervalle si présent
        if (timeRef.current) {
            clearInterval(timeRef.current)
        }

        // Nouvel intervalle
        timeRef.current = setInterval(() => {
            setTimer(prev => {
                if (prev <= 1) {
                    clearInterval(timeRef.current);
                    setIsCorrect(false)
                    return 0;
                }
                return prev - 1;
            });
        }, 1_000)

        // Nettoyage au changement de question
        return () => clearInterval(timeRef.current)
    }, [questionCount]);

    return (
        <div className={styles.solo_game}>
            <div className={styles.header}>
                <hgroup>
                    <h3>Quiz solo</h3>
                    <h6>Question 5 sur 10</h6>
                </hgroup>
                <hgroup className={styles.timer}>
                    <h3>10</h3>
                    <h6>secondes</h6>
                </hgroup>
            </div>

            <div className={styles.container_progress_bar}>
                <div className={styles.progress_bar}></div>
            </div>

            <div className={styles.container_question}>
                <div className={styles.theme}>Sciences</div>
                <h4>Quand a eu lieu la révolution française ?</h4>
                <div className={styles.container_answers}>
                    <button>
                        <span>1776</span>
                        <span>Faux</span>
                    </button>
                    <button>
                        <span>1789</span>
                        <span>Correct</span>
                    </button>
                    <button>
                        <span>1876</span>
                        <span>Faux</span>
                    </button>
                    <button>
                        <span>1889</span>
                        <span>Faux</span>
                    </button>
                </div>
            </div>

            <button className={styles.btn_next}>Question suivante (ou voir les résultats)</button>
        </div>
    )
}