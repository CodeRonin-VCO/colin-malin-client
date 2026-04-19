import { useActionState, useRef, useState } from "react";
import styles from "./add-questions.module.css";
import useQuestions from "../../../hooks/useQuestions.js";
import Button from "../../ui/buttons/buttons.jsx";
import Toast from "../../ui/toast/toast.jsx";

export default function AddQuestionsForm() {
    const { fetchCreate } = useQuestions();
    const formRef = useRef(null);
    const [toast, setToast] = useState(null);
    const [answers, setAnswers] = useState(["", "", "", ""]);

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

        const errors = {};
        if (!data.theme) errors.theme = "Champ obligatoire";
        if (!data.question) errors.question = "Champ obligatoire";
        if (data.answers.some(ans => !ans)) errors.answers = "Champ obligatoire";
        if (!data.correct_answer) errors.correct_answer = "Champ obligatoire";
        if (!data.difficulty) errors.difficulty = "Champ obligatoire";
        if (Object.keys(errors).length > 0) {
            setToast({ message: "Tous les champs sont obligatoires.", type: "warning" });

            return {
                data: null,
                errors,
                success: false
            }
        };

        try {
            await fetchCreate(data);

            if (formRef.current) formRef.current.reset();
            setAnswers(["", "", "", ""]);

            setToast({ message: `[${data.theme}] - ${data.question} - Bonne réponse: ${data.correct_answer}`, type: "success" });

            return {
                data,
                errors: {},
                success: true
            }

        } catch (error) {
            setToast({ message: "Echec dans la création de la question.", type: "error" });

            return {
                data: null,
                errors,
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
        <>

            <form action={handleForm} className={styles.form} ref={formRef}>
                <div className={styles.input_group}>
                    <label htmlFor="theme">
                        Choisissez le thème:
                        {state.errors?.theme && (<span className={styles.required}>{state.errors.theme}</span>)}
                    </label>
                    <select name="theme" id="theme">
                        <option value="sciences">Sciences</option>
                        <option value="culture">Culture</option>
                        <option value="geography">Géographie</option>
                        <option value="history">Histoire</option>
                        <option value="sport">Sport</option>
                        <option value="sociology">Sociologie</option>
                        <option value="technology">Technologies</option>
                    </select>
                </div>
                <div className={styles.input_group}>
                    <label htmlFor="question">
                        Posez votre question:
                        {state.errors?.question && (<span className={styles.required}>{state.errors.question}</span>)}
                    </label>
                    <input type="text" id="question" name="question" />
                </div>
                <div className={styles.input_group}>
                    <label htmlFor="answers">
                        Proposez quatre réponses:
                        {state.errors?.answers && (<span className={styles.required}>{state.errors.answers}</span>)}
                    </label>
                    <input type="text" id="answer1" name="answer1" placeholder="Option 1" value={answers[0]} onChange={(e) => handleAnswerChange(0, e.target.value)} />
                    <input type="text" id="answer2" name="answer2" placeholder="Option 2" value={answers[1]} onChange={(e) => handleAnswerChange(1, e.target.value)} />
                    <input type="text" id="answer3" name="answer3" placeholder="Option 3" value={answers[2]} onChange={(e) => handleAnswerChange(2, e.target.value)} />
                    <input type="text" id="answer4" name="answer4" placeholder="Option 4" value={answers[3]} onChange={(e) => handleAnswerChange(3, e.target.value)} />
                </div>
                <div className={styles.input_group}>
                    <label htmlFor="correct_answer">
                        Choisissez la bonne réponse:
                        {state.errors?.correct_answer && (<span className={styles.required}>{state.errors.correct_answer}</span>)}
                    </label>
                    <select name="correct_answer" id="correct_answer">
                        <option value="">-- Choisir --</option>
                        {answers.filter(a => a).map((a, i) => (
                            <option key={i} value={a}>{a}</option>
                        ))}
                    </select>
                </div>
                <div className={styles.input_group}>
                    <label htmlFor="difficulty">
                        Inscrivez la difficulté de la question:
                        {state.errors?.difficulty && (<span className={styles.required}>{state.errors.difficulty}</span>)}
                    </label>
                    <select name="difficulty" id="difficulty">
                        <option value="low">Faible</option>
                        <option value="medium">Moyenne</option>
                        <option value="high">Elevée</option>
                    </select>
                </div>

                <Button type="submit" variant={"btn_submit"} disabled={isPending}>
                    {isPending ? "Validation en cours" : "Valider"}
                </Button>
            </form>

            {/* TOAST */}
            {toast && (
                <Toast message={toast.message} type={toast.type} onDismiss={() => setToast(null)} />
            )}
        </>
    )
}