import { FaTools } from "react-icons/fa";
import AddQuestionsForm from "../../components/forms/add-questions/add-questions.jsx";
import FooterLayout from "../../layouts/footer/footer.jsx";
import HeaderLayout from "../../layouts/header/header.jsx";
import styles from "./admin.route.module.css";
import { useState } from "react";
import ManageQuestionsAdmin from "../../components/manage-questions/manage-questions.jsx";

export default function AdminPage() {
    const [seeQuestions, setSeeQuestions] = useState(false);


    return (
        <div className="page">
            <HeaderLayout />
            <main className={styles.main}>
                {!seeQuestions && (
                    <>
                        <AddQuestionsForm />
                        <button className={styles.btn_options} onClick={() => setSeeQuestions(true)}>
                            <span><FaTools /></span>
                        </button>
                    </>
                )}
                {seeQuestions && (
                    <>
                        <ManageQuestionsAdmin />
                        <button className={styles.btn_back} onClick={() => setSeeQuestions(false)}>Retour</button>
                    </>
                )}

            </main>
            <FooterLayout />
        </div>
    )
}