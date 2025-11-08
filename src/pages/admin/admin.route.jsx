import AddQuestionsForm from "../../components/forms/add-questions/add-questions.jsx";
import FooterLayout from "../../layouts/footer/footer.jsx";
import HeaderLayout from "../../layouts/header/header.jsx";
import styles from "./admin.route.module.css";

export default function AdminPage() {


    return (
        <div className="page">
            <HeaderLayout />
            <main>
                <AddQuestionsForm />
            </main>
            <FooterLayout />
        </div>
    )
}