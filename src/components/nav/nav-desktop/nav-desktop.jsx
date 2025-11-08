import { NavLink } from "react-router";
import styles from "./nav-desktop.module.css";
import { IoIosLogOut } from "react-icons/io";


export default function NavDesktop() {


    return (
        <nav className={styles.nav}>
            <NavLink to={"/getStarted"} className={({ isActive }) => isActive ? styles.active : ""}>Get started</NavLink>
            <NavLink to={"/quiz-config"} className={({ isActive }) => isActive ? styles.active : ""}>Quiz config</NavLink>
            <NavLink to={"/quiz"} className={({ isActive }) => isActive ? styles.active : ""}>Quiz</NavLink>
            <NavLink to={"/stat"} className={({ isActive }) => isActive ? styles.active : ""}>Statistiques</NavLink>
            <NavLink to={"/admin"} className={({ isActive }) => isActive ? styles.active : ""}>Admin</NavLink>
            <NavLink to={"/"} className={({ isActive }) => isActive ? styles.active : ""} title="Log out"><IoIosLogOut /></NavLink>
        </nav>
    )
}