import { useAtom } from "jotai";
import styles from "./solo.module.css";
import { questionsAtom } from "../../../atom/atom.js";
import { useEffect, useMemo, useRef, useState } from "react";
import useQuestions from "./../../../hooks/useQuestions.js";
import { GiCheckMark, GiCrossMark } from "react-icons/gi";
import QuizResultsPopup from "../../modal/popup-quizResults/popup-quizResults.jsx";
import { shuffleArray } from "../../../utils/shuffleArray.js";

export default function SoloGame() {
    const [questions, setQuestions] = useAtom(questionsAtom);
    const { fetchFiltered } = useQuestions();

    // Question en cours
    const [questionCount, setQuestionCount] = useState(0);
    const currentQuestion = Array.isArray(questions) ? questions[questionCount] : null;

    // Cliquer sur une réponse
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    // Vérifier la réponse
    const [isCorrect, setIsCorrect] = useState(null);

    // Attribution joueur et points
    const [answersLog, setAnswersLog] = useState([]);
    const [showPopup, setShowPopup] = useState(false);

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

    useEffect(() => {
        fetchFiltered();
    }, []);

    // Shuffle answers
    const shuffledAnswers = useMemo(() => {
        if (!currentQuestion) return [];
        return shuffleArray(currentQuestion.answers);
    }, [currentQuestion]);

    async function handleAnswerClick(answer) {
        if (selectedAnswer === null) {
            setSelectedAnswer(answer);
            setIsCorrect(answer === currentQuestion.correct_answer);
            clearInterval(timeRef.current);

            setAnswersLog(prev => [
                ...prev,
                {
                    question_id: currentQuestion.question_id,
                    question: currentQuestion.question,
                    theme: currentQuestion.theme,
                    difficulty: currentQuestion.difficulty,
                    correct_answer: currentQuestion.correct_answer,
                    user_answer: answer,
                    is_correct: answer === currentQuestion.correct_answer,
                }
            ]);
        }
    };

    function handleNextQuestion() {
        if (questionCount < questions.length - 1) {
            setQuestionCount(questionCount + 1);
            setSelectedAnswer(null);
            setIsCorrect(null);

        } else {
            setShowPopup(true);
        }
    }

    return (
        <div className={styles.solo_game}>
            {currentQuestion ? (
                <>
                    <div className={styles.header}>
                        <hgroup>
                            <h3>Quiz solo</h3>
                            <h6>Question {questionCount + 1} sur {questions.length}</h6>
                        </hgroup>
                        <hgroup className={styles.timer}>
                            <h3>{timer}</h3>
                            <h6>secondes</h6>
                        </hgroup>
                    </div>

                    <div className={styles.container_progress_bar}>
                        <div className={styles.progress_bar} style={{ width: `${((questionCount + 1) / questions.length) * 100}%` }}></div>
                    </div>

                    <div className={styles.container_question}>
                        <div className={styles.theme}>{currentQuestion.theme}</div>
                        <h4>{currentQuestion.question}</h4>
                        <div className={styles.container_answers}>
                            {shuffledAnswers.map((a, i) => (
                                <button
                                    key={i}
                                    onClick={timer === 0 ? undefined : () => handleAnswerClick(a)}
                                    className={selectedAnswer === a
                                        ? isCorrect
                                            ? styles.correct
                                            : styles.incorrect
                                        : selectedAnswer === null && timer === 0
                                            ? a === currentQuestion.correct_answer
                                                ? styles.correct
                                                : styles.incorrect
                                            : "inherit"}>
                                    <span>{a}</span>
                                    <span>
                                        {selectedAnswer === a && (
                                            isCorrect ? (
                                                <>
                                                    <GiCheckMark /> &nbsp; Correct
                                                </>
                                            ) : (
                                                <>
                                                    <GiCrossMark /> &nbsp; Faux
                                                </>
                                            )
                                        )}
                                        {timer === 0 && (
                                            a === currentQuestion.correct_answer ? (
                                                <>
                                                    <GiCheckMark /> &nbsp; Correct
                                                </>
                                            ) : (
                                                <>
                                                    <GiCrossMark /> &nbsp; Faux
                                                </>
                                            )
                                        )}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <button className={styles.btn_next} onClick={handleNextQuestion} disabled={isCorrect === null}>
                        {questionCount === questions.length - 1 ? "Fin du quiz" : "Question suivante"}
                    </button>
                    {isCorrect !== null && (
                        <p className={styles.feedback}>
                            {isCorrect ? "Bravo, c'est la bonne réponse ! 🎉" : `Incorrect. 😭 La bonne réponse était : ${currentQuestion.correct_answer}`}
                        </p>
                    )}
                </>
            ) : (
                <p>Aucune question disponible avec cette configuration.</p>
            )}

            {showPopup && (
                <QuizResultsPopup
                    answersLog={answersLog}
                    questions={questions}
                />
            )}
        </div>
    )
}