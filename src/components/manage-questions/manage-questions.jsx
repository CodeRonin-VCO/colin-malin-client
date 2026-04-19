import { useEffect, useState } from "react";
import useQuestions from "../../hooks/useQuestions.js";
import { DIFFICULTY_MAP, THEME_MAP, translateValue } from "../../utils/translate-mapping.js";
import styles from "./manage-questions.module.css";
import { useAtom } from "jotai";
import { questionsAtom } from "../../atom/atom.js";
import Toast from "./../ui/toast/toast.jsx";
import { CiMenuKebab } from "react-icons/ci";
import UpdateQuestionsForm from "../forms/update-questions/update-questions.jsx";
import SearchBar from "../searchBar/searchBar.jsx";
import Button from "../ui/buttons/buttons.jsx";

export default function ManageQuestionsAdmin() {
    const { fetchGetAll, fetchDelete, isLoading, hasMore } = useQuestions();
    const [questions] = useAtom(questionsAtom);
    const [offset, setOffset] = useState(0);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    let limit = 20;
    const [toast, setToast] = useState(null);
    const [kebabMenuOpen, setKebabMenuOpen] = useState(null);
    const [updateFormOpen, setUpdateFormOpen] = useState(null);

    useEffect(() => {
        fetchGetAll(offset, limit);
    }, [offset, limit, refreshTrigger]); // eslint-disable-line react-hooks/exhaustive-deps

    function handleRefresh() {
        setOffset(0);
        setRefreshTrigger(prev => prev + 1);
    };

    function loadMoreQuestions() {
        setOffset(prev => prev + 20);
    };

    async function deleteQuestion(question_id) {
        if (!question_id) return;

        const isConfirmed = window.confirm("Êtes-vous sûr de vouloir supprimer cette question ?");
        if (!isConfirmed) return;

        try {
            await fetchDelete(question_id);
            setToast({ message: "Question supprimée avec succès.", type: "success" })
            await fetchGetAll(offset, limit);

        } catch (error) {
            setToast({ message: "Erreur lors de la suppression de la question.", type: "error" });
            console.error("Erreur suppression question :", error);
        }
    };


    return (
        <>
            <Button
                type="button"
                variant={"btn_refresh"}
                onClick={() => handleRefresh()}
                disabled={isLoading}
            >
                {isLoading ? "Chargement..." : "Actualiser la liste"}
            </Button>
            <SearchBar />
            <ul className={styles.questions_list}>
                {questions.map((q) => (
                    <li key={q.question_id} className={styles.card}>
                        <div className={styles.question}><strong>{q.question}</strong></div>
                        <div className={styles.theme}>{translateValue(q.theme, THEME_MAP)}</div>
                        <div className={styles.flex}>
                            <div className={styles.container_answers}>
                                {q.answers.map((a, index) => (
                                    <div key={index} className={a === q.correct_answer ? styles.correct_answer : ""}>{a}</div>
                                ))}
                            </div>
                            <div className={`${styles.difficulty} ${q.difficulty === "high" ? styles.high : q.difficulty === "medium" ? styles.medium : styles.low}`}>{translateValue(q.difficulty, DIFFICULTY_MAP)}</div>
                        </div>
                        <div className={styles.menu_update}>
                            <span onClick={() => setKebabMenuOpen(kebabMenuOpen === q.question_id ? null : q.question_id)} title="Gestion de la question"><CiMenuKebab /></span>

                            {/* Popup Kebab menu */}
                            {kebabMenuOpen === q.question_id && (
                                <div className={styles.container_btn}>
                                    <Button
                                        type="button"
                                        onClick={() => setUpdateFormOpen(q.question_id)}
                                        variant={"edit_btn"}
                                    >
                                        Modifier
                                    </Button>
                                    <Button
                                        type="button"
                                        onClick={() => deleteQuestion(q.question_id)}
                                        variant={"delete_btn"}
                                    >
                                        Supprimer
                                    </Button>
                                </div>
                            )}

                            {/* Popup setUpdateFormOpen */}
                            {updateFormOpen === q.question_id && (
                                <UpdateQuestionsForm
                                    questionId={q.question_id}
                                    setUpdateFormOpen={setUpdateFormOpen}
                                    question={q}
                                    setToast={setToast}
                                />
                            )}
                        </div>
                    </li>
                ))}
            </ul>
            {hasMore && (
                <Button
                    type="button"
                    onClick={() => loadMoreQuestions()}
                    variant={"btn_refresh"}
                    state={"btn_more"}
                    disabled={isLoading}
                >
                    {isLoading ? "Chargement..." : "Charger plus"}
                </Button>
            )}

            {/* TOAST */}
            {toast && (<Toast message={toast.message} type={toast.type} onDismiss={() => setToast(null)} />)}

        </>
    )
}