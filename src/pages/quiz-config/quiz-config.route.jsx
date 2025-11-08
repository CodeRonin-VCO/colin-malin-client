import ConfigGameForm from "../../components/forms/config-game/config-game.jsx";
import FooterLayout from "../../layouts/footer/footer.jsx";
import HeaderLayout from "../../layouts/header/header.jsx";
import styles from "./quiz-config.route.module.css";

export default function QuizConfigPage() {


    return (
        <div className="page">
            <HeaderLayout />
            <main>
                <div>
                    <h3 className={styles.title}>Paramètre ta partie</h3>
                    <p></p>
                </div>
                <div>
                    <ConfigGameForm />
                </div>
            </main>
            <FooterLayout />
        </div>
    )
}