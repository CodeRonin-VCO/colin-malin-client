import { useActionState, useRef } from "react";
import styles from "./add-questions.module.css";

export default function AddQuestionsForm() {
    // todo: connect to db
    // const { fetchCreateQuestion } = useGames();
    const formRef = useRef(null);

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
            return {
                data: null,
                errors,
                message: "Tous les champs sont obligatoires."
            }
        };

        try {
            // todo: connect to db
            // await fetchCreateQuestion(data);
            if (formRef.current) formRef.current.reset();

            return {
                data,
                errors: {},
                message: "Votre question a bien été ajoutée à notre base de données."
            }

        } catch (error) {
            return {
                data: null,
                errors,
                message: error.message || "Echec dans la création de la question."
            }
        }
    }

    const initialData = { data: null, errors: {}, message: null };
    const [state, handleForm, isPending] = useActionState(addQuestionsAction, initialData);


    return (
        <form action={handleForm} className={styles.form} ref={formRef}>
            <div className={styles.input_group}>
                <label htmlFor="theme">Choisissez le thème:</label>
                <select name="theme" id="theme">
                    <option value="sciences">Sciences</option>
                    <option value="culture">Culture</option>
                    <option value="geography">Géographie</option>
                    <option value="history">Histoire</option>
                    <option value="sport">Sport</option>
                    <option value="sociology">Sociologie</option>
                </select>
            </div>
            <div className={styles.input_group}>
                <label htmlFor="question">Posez ta question:</label>
                <input type="text" id="question" name="question" />
            </div>
            <div className={styles.input_group}>
                <label htmlFor="answers">Proposez quatre réponses:</label>
                <input type="text" id="answer1" name="answer1" placeholder="Option 1" />
                <input type="text" id="answer2" name="answer2" placeholder="Option 2" />
                <input type="text" id="answer3" name="answer3" placeholder="Option 3" />
                <input type="text" id="answer4" name="answer4" placeholder="Option 4" />
            </div>
            <div className={styles.input_group}>
                <label htmlFor="correct_answer">Inscrivez la bonne réponse:</label>
                <input type="text" id="correct_answer" name="correct_answer" />
            </div>
            <div className={styles.input_group}>
                <label htmlFor="difficulty">Inscrivez la difficulté de la question:</label>
                <select name="difficulty" id="difficulty">
                    <option value="low">Faible</option>
                    <option value="medium">Moyenne</option>
                    <option value="high">Elevée</option>
                </select>
            </div>
            <button type="submit" className={styles.btn_submit}>{isPending ? "Validation en cours" : "Valider"}</button>
            {state.message && (
                <p className={styles.error_msg}>{state.message}</p>
            )}
        </form>
    )
}