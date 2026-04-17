import { FaTools } from "react-icons/fa";
import AddQuestionsForm from "../../components/forms/add-questions/add-questions.jsx";
import FooterLayout from "../../layouts/footer/footer.jsx";
import HeaderLayout from "../../layouts/header/header.jsx";
import styles from "./admin.route.module.css";
import { useState } from "react";
import ManageQuestionsAdmin from "../../components/manage-questions/manage-questions.jsx";
import Button from "../../components/ui/buttons/buttons.jsx";

export default function AdminPage() {
    const [seeQuestions, setSeeQuestions] = useState(false);


    return (
        <div className="page">
            <HeaderLayout />
            <main className={styles.main}>
                {!seeQuestions && (
                    <>
                        <h3 className={styles.title}>Ajouter une question à la base de données</h3>
                        <AddQuestionsForm />
                        <Button
                            type="button"
                            onClick={() => setSeeQuestions(true)}
                            variant={"btn_options"}
                        >
                            <span><FaTools /></span>
                        </Button>
                    </>
                )}
                {seeQuestions && (
                    <>
                        <ManageQuestionsAdmin />
                        <Button
                            type="button"
                            onClick={() => setSeeQuestions(false)}
                            variant={"btn_back_admin"}
                        >
                            Retour
                        </Button>
                    </>
                )}

            </main>
            <FooterLayout />
        </div>
    )
}