import { FaRegEdit } from "react-icons/fa";
import AddQuestionsForm from "../../components/forms/add-questions/add-questions.jsx";
import FooterLayout from "../../layouts/footer/footer.jsx";
import HeaderLayout from "../../layouts/header/header.jsx";
import styles from "./admin.route.module.css";
import Button from "../../components/ui/buttons/buttons.jsx";
import { useNavigate } from "react-router";

export default function AdminPage() {
    const navigate = useNavigate();


    return (
        <div className="page">
            <HeaderLayout />
            <main className={styles.main}>
                <h3 className={styles.title}>Ajouter une question</h3>
                <AddQuestionsForm />
                <Button
                    type="button"
                    onClick={() => navigate("/admin/manage")}
                    variant={"btn_options"}
                >
                    <span><FaRegEdit /></span>
                    <span>Gérer les questions</span>
                </Button>
            </main>
            <FooterLayout />
        </div>
    )
}