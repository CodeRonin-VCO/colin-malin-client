import { useState } from "react";
import LoginForm from "../../components/forms/login/login.jsx";
import RegisterForm from "../../components/forms/register/register.jsx";
import FooterLayout from "../../layouts/footer/footer.jsx";
import styles from "./home.route.module.css";
import HomeHeaderLayout from "../../layouts/home-header/home-header.jsx";

export default function HomeRoute() {
    const [switchForm, setSwitchForm] = useState(true);


    return (
        <div className="page">
            <HomeHeaderLayout />
            <main>
                {switchForm && (
                    <LoginForm setSwitchForm={setSwitchForm} />
                )}
                {!switchForm && (
                    <RegisterForm setSwitchForm={setSwitchForm} />
                )}
            </main>
            <FooterLayout />
        </div>
    )
}