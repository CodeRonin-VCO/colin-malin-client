import { useActionState, useState } from "react";
import styles from "./config-game.module.css";
import { useAtom } from "jotai";
import { gameConfigAtom } from "../../../atom/atom.js";
import { useNavigate } from "react-router";
import useQuestions from "../../../hooks/useQuestions.js";

export default function ConfigGameForm() {
    // todo: connexion db
    // Connexion avec game pour stocker la partie et les questions
    const [gameConfig, setGameConfig] = useAtom(gameConfigAtom);
    const [activeDifficulty, setActiveDifficulty] = useState("");
    const [activeTheme, setActiveTheme] = useState([]);
    const [activeType, setActiveType] = useState("");
    const navigate = useNavigate();

    function handleTheme(targetId) {
        if (targetId === "mix") {
            setActiveTheme(prev => prev.includes("mix") ? [] : ["mix"]);

        } else {
            if (activeTheme.includes("mix")) {
                return;
            }
            setActiveTheme(prev => {
                const existingTheme = prev.find(th => th === targetId);
                if (existingTheme) {
                    return prev.filter(th => th !== targetId);
                } else {
                    return [...prev, targetId];
                };
            });
        };
    };

    async function configAction(prevState, formData) {
        const data = {
            nb_questions: parseInt(formData.get("nb_questions")),
            theme: formData.getAll("theme"),
            difficulty: formData.get("difficulty"),
            mode: formData.get("mode")
        };

        const errors = {};
        if (!data.nb_questions) errors.nb_questions = "Champ obligatoire";
        if (!data.theme || data.theme.length === 0) errors.theme = "Champ obligatoire";
        if (!data.difficulty) errors.difficulty = "Champ obligatoire";
        if (!data.mode) errors.mode = "Champ obligatoire";
        if (Object.keys(errors).length > 0) {
            return {
                data: null,
                errors,
                message: "Tous les champs sont obligatoires."
            }
        };

        try {
            setGameConfig(data);
            // Todo: connexion db
            // await fetchCreateGames(data);
            navigate("/quiz");

            return {
                data,
                errors: {},
                message: "Partie configurée."
            }

        } catch (error) {
            return {
                data: null,
                errors: {},
                message: error.message || "Echec dans la configuration de la partie."
            };
        };
    }

    const initialData = { data: null, errors: {}, message: null };
    const [state, handleForm, isPending] = useActionState(configAction, initialData);    

    return (
        <form action={handleForm} className={styles.form}>
            <div className={styles.input_group}>
                <h4 className={styles.title}>
                    Nombre de questions
                    {state.errors?.nb_questions && (<span className={styles.required}>{state.errors.nb_questions}</span>)}
                </h4>
                <input type="number" id="nb_questions" name="nb_questions" min={5} max={50} step={5} />
            </div>

            <div className={`${styles.input_group} ${styles.difficulty}`}>
                <h4 className={styles.title}>
                    Difficulté
                    {state.errors?.difficulty && (<span className={styles.required}>{state.errors.difficulty}</span>)}
                </h4>
                <label htmlFor="all" className={`${styles.all} ${activeDifficulty === "all" ? styles.active : ""}`}>
                    <input type="radio" name="difficulty" id="all" value="all" checked={activeDifficulty === "all"} onChange={(e) => setActiveDifficulty(e.target.id)} />
                    Toutes les difficultés
                </label>
                <label htmlFor="high" className={`${styles.high} ${activeDifficulty === "high" ? styles.active : ""}`}>
                    <input type="radio" name="difficulty" id="high" value="high" checked={activeDifficulty === "high"} onChange={(e) => setActiveDifficulty(e.target.id)} />
                    Difficile
                </label>
                <label htmlFor="medium" className={`${styles.medium} ${activeDifficulty === "medium" ? styles.active : ""}`}>
                    <input type="radio" name="difficulty" id="medium" value="medium" checked={activeDifficulty === "medium"} onChange={(e) => setActiveDifficulty(e.target.id)} />
                    Normal
                </label>
                <label htmlFor="low" className={`${styles.low} ${activeDifficulty === "low" ? styles.active : ""}`}>
                    <input type="radio" name="difficulty" id="low" value="low" checked={activeDifficulty === "low"} onChange={(e) => setActiveDifficulty(e.target.id)} />
                    Facile
                </label>
            </div>

            <div className={`${styles.input_group} ${styles.theme}`}>
                <h4 className={styles.title}>
                    Thèmes
                    {state.errors?.theme && (<span className={styles.required}>{state.errors.theme}</span>)}
                </h4>
                <label htmlFor="mix" className={`${styles.mix} ${activeTheme.includes("mix") ? styles.active : ""}`}>
                    <input type="checkbox" name="theme" id="mix" value="mix" checked={activeTheme.includes("mix")} onChange={(e) => handleTheme(e.target.id)} />
                    Tous les thèmes
                </label>
                <label htmlFor="sciences" className={`${styles.sciences} ${activeTheme.includes("sciences") ? styles.active : ""}`}>
                    <input type="checkbox" name="theme" id="sciences" value="sciences" checked={activeTheme.includes("sciences")} onChange={(e) => handleTheme(e.target.id)} />
                    Sciences
                </label>
                <label htmlFor="culture" className={`${styles.culture} ${activeTheme.includes("culture") ? styles.active : ""}`}>
                    <input type="checkbox" name="theme" id="culture" value="culture" checked={activeTheme.includes("culture")} onChange={(e) => handleTheme(e.target.id)} />
                    Culture
                </label>
                <label htmlFor="geography" className={`${styles.geography} ${activeTheme.includes("geography") ? styles.active : ""}`}>
                    <input type="checkbox" name="theme" id="geography" value="geography" checked={activeTheme.includes("geography")} onChange={(e) => handleTheme(e.target.id)} />
                    Géographie
                </label>
                <label htmlFor="history" className={`${styles.history} ${activeTheme.includes("history") ? styles.active : ""}`}>
                    <input type="checkbox" name="theme" id="history" value="history" checked={activeTheme.includes("history")} onChange={(e) => handleTheme(e.target.id)} />
                    Histoire
                </label>
                <label htmlFor="sport" className={`${styles.sport} ${activeTheme.includes("sport") ? styles.active : ""}`}>
                    <input type="checkbox" name="theme" id="sport" value="sport" checked={activeTheme.includes("sport")} onChange={(e) => handleTheme(e.target.id)} />
                    Sport
                </label>
                <label htmlFor="sociology" className={`${styles.sociology} ${activeTheme.includes("sociology") ? styles.active : ""}`}>
                    <input type="checkbox" name="theme" id="sociology" value="sociology" checked={activeTheme.includes("sociology")} onChange={(e) => handleTheme(e.target.id)} />
                    Sociologie
                </label>
            </div>

            <div className={`${styles.input_group} ${styles.types}`}>
                <h4 className={styles.title}>
                    Type de partie
                    {state.errors?.mode && (<span className={styles.required}>{state.errors.mode}</span>)}
                </h4>
                <label htmlFor="solo" className={`${styles.solo} ${activeType === "solo" ? styles.active : ""}`}>
                    <input type="radio" id="solo" name="mode" value="solo" checked={activeType === "solo"} onChange={(e) => setActiveType(e.target.id)} />
                    Solo
                </label>
                <label htmlFor="multi" className={`${styles.multi} ${activeType === "multi" ? styles.active : ""}`}>
                    <input type="radio" id="multi" name="mode" value="multi" checked={activeType === "multi"} onChange={(e) => setActiveType(e.target.id)} />
                    Multijoueur
                </label>
            </div>

            <button className={styles.btn_submit} type="submit">Configurer la partie</button>
        </form>
    )
}