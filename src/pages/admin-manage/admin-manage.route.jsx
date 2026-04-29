import { useNavigate } from "react-router";
import styles from "./admin-manage.route.module.css";
import HeaderLayout from "../../layouts/header/header.jsx";
import FooterLayout from "../../layouts/footer/footer.jsx";
import ManageQuestionsAdmin from "../../components/manage-questions/manage-questions.jsx";
import Button from "../../components/ui/buttons/buttons.jsx";



export default function ManageQuestionsPage() {
    const navigate = useNavigate();
    return (
        <div className="page">
            <HeaderLayout />
            <main className={styles.main}>
                <h3 className={styles.title}>Gérer vos questions</h3>
                <ManageQuestionsAdmin />
                <Button
                    type="button"
                    onClick={() => navigate("/admin")}
                    variant={"btn_back_admin"}
                >
                    Retour
                </Button>
            </main>
            <FooterLayout />
        </div>
    )
}