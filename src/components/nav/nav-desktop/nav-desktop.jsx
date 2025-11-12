import { NavLink, useNavigate } from "react-router";
import styles from "./nav-desktop.module.css";
import { IoIosLogOut } from "react-icons/io";
import useAuth from "../../../hooks/useAuth.js";


export default function NavDesktop() {
    const { fetchLogout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async (e) => {
        e.preventDefault(); // empêche NavLink de naviguer tout de suite
        await fetchLogout(); // exécute ton logout
        navigate("/"); // redirige manuellement
    };

    return (
        <nav className={styles.nav}>
            <NavLink to={"/getStarted"} className={({ isActive }) => isActive ? styles.active : ""}>Get started</NavLink>
            <NavLink to={"/quiz-config"} className={({ isActive }) => isActive ? styles.active : ""}>Quiz config</NavLink>
            <NavLink to={"/quiz"} className={({ isActive }) => isActive ? styles.active : ""}>Quiz</NavLink>
            <NavLink to={"/stat"} className={({ isActive }) => isActive ? styles.active : ""}>Statistiques</NavLink>
            <NavLink to={"/admin"} className={({ isActive }) => isActive ? styles.active : ""}>Admin</NavLink>
            <NavLink to={"/"} className={({ isActive }) => isActive ? styles.active : ""} title="Log out" onClick={handleLogout}><IoIosLogOut /></NavLink>
        </nav>
    )
}