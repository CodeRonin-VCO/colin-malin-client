import { useActionState, useState } from "react";
import useQuestions from "../../../hooks/useQuestions.js";
import styles from "./update-questions.module.css";
import { arraysEqual } from "../../../utils/equalArray.js";
import Button from "../../ui/buttons/buttons.jsx";

export default function UpdateQuestionsForm({ questionId, setUpdateFormOpen, question, setToast }) {
    const { fetchModify } = useQuestions();
    const [answers, setAnswers] = useState([
        question.answers[0],
        question.answers[1],
        question.answers[2],
        question.answers[3],
    ]);

    async function addQuestionsAction(prevState, formData) {
        const data = {
            theme: formData.get("theme"),
            question: formData.get("question"),
            answers: [
                formData.get("answer1"),
                formData.get("answer2"),
                formData.get("answer3"),
                formData.get("answer4"),
            ],
            correct_answer: formData.get("correct_answer"),
            difficulty: formData.get("difficulty"),
        };

        let updates = {};
        if (data.theme !== question.theme) updates.theme = data.theme;
        if (data.question !== question.question) updates.question = data.question;
        if (!arraysEqual(data.answers, question.answers)) updates.answers = data.answers;
        if (data.correct_answer !== question.correct_answer) updates.correct_answer = data.correct_answer;
        if (data.difficulty !== question.difficulty) updates.difficulty = data.difficulty;


        try {
            await fetchModify(questionId, updates);
            setUpdateFormOpen(false);
            setToast({ message: "Question modifiée avec succès.", type: "success" })

            return {
                data,
                success: true
            }

        } catch (error) {
            setToast({ message: "Erreur lors de la modification de la question.", type: "error" })

            return {
                data: null,
                success: false
            }
        }
    }

    function handleAnswerChange(index, value) {
        setAnswers(prev => {
            const updated = [...prev];
            updated[index] = value;
            return updated;
        });
    }

    const initialData = { data: null, errors: {}, message: null };
    const [state, handleForm, isPending] = useActionState(addQuestionsAction, initialData);


    return (
        <form action={handleForm} className={styles.form}>
            <div className={styles.input_group}>
                <label htmlFor="theme">Choisissez le thème:</label>
                <select name="theme" id="theme" defaultValue={question.theme}>
                    <option value="sciences">Sciences</option>
                    <option value="culture">Culture</option>
                    <option value="geography">Géographie</option>
                    <option value="history">Histoire</option>
                    <option value="sport">Sport</option>
                    <option value="technology">Technologies</option>
                    <option value="sociology">Sociologie</option>
                </select>
            </div>
            <div className={styles.input_group}>
                <label htmlFor="question">Posez votre question:</label>
                <textarea name="question" id="question" defaultValue={question.question} ></textarea>
            </div>
            <div className={styles.input_group}>
                <label htmlFor="answers">Proposez quatre réponses:</label>
                <input type="text" id="answer1" name="answer1" value={answers[0]} onChange={(e) => handleAnswerChange(0, e.target.value)} />
                <input type="text" id="answer2" name="answer2" value={answers[1]} onChange={(e) => handleAnswerChange(0, e.target.value)} />
                <input type="text" id="answer3" name="answer3" value={answers[2]} onChange={(e) => handleAnswerChange(0, e.target.value)} />
                <input type="text" id="answer4" name="answer4" value={answers[3]} onChange={(e) => handleAnswerChange(0, e.target.value)} />
            </div>
            <div className={styles.input_group}>
                <label htmlFor="correct_answer">Inscrivez la bonne réponse:</label>
                <select name="correct_answer" id="correct_answer" defaultValue={question.correct_answer}>
                    <option value="">-- Choisir --</option>
                    {answers.filter(a => a).map((a, i) => (
                        <option key={i} value={a}>{a}</option>
                    ))}
                </select>
            </div>
            <div className={styles.input_group}>
                <label htmlFor="difficulty">Inscrivez la difficulté de la question:</label>
                <select name="difficulty" id="difficulty" defaultValue={question.difficulty}>
                    <option value="low">Faible</option>
                    <option value="medium">Moyenne</option>
                    <option value="high">Elevée</option>
                </select>
            </div>
            <div className={styles.container_btn}>
                <Button type="button" onClick={() => setUpdateFormOpen(false)} variant={"btn_back"}>
                    Annuler
                </Button>
                <Button type="submit" variant={"btn_submit"} disabled={isPending}>
                    {isPending ? "Validation en cours" : "Valider"}
                </Button>
            </div>
        </form>
    )
}