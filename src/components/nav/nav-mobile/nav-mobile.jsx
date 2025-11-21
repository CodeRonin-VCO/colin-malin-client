import { useState } from "react";
import styles from "./nav-mobile.module.css";
import { NavLink, useNavigate } from "react-router";
import { IoIosLogOut } from "react-icons/io";
import useAuth from "../../../hooks/useAuth.js";


export default function NavMobile() {
    const [isOpen, setIsOpen] = useState(false);
    const { fetchLogout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async (e) => {
        e.preventDefault();
        await fetchLogout();
        navigate("/");
    };


    return (
        <nav className={styles.nav} onClick={() => setIsOpen(!isOpen)}>
            <div className={`${styles.menu_burger} ${isOpen ? styles.isOpen : ""}`}>
                <div className={`${styles.line} ${styles.top}`}></div>
                <div className={`${styles.line} ${styles.middle}`}></div>
                <div className={`${styles.line} ${styles.bottom}`}></div>
            </div>
            {isOpen && (
                <nav className={styles.panel}>
                    <NavLink to={"/getStarted"} className={({ isActive }) => isActive ? styles.active : ""}>Get started</NavLink>
                    <NavLink to={"/quiz-config"} className={({ isActive }) => isActive ? styles.active : ""}>Quiz config</NavLink>
                    <NavLink to={"/quiz"} className={({ isActive }) => isActive ? styles.active : ""}>Quiz</NavLink>
                    <NavLink to={"/stat"} className={({ isActive }) => isActive ? styles.active : ""}>Statistiques</NavLink>
                    <NavLink to={"/admin"} className={({ isActive }) => isActive ? styles.active : ""}>Admin</NavLink>
                    <NavLink to={"/"} className={({ isActive }) => isActive ? styles.active : ""} title="Log out" onClick={handleLogout}>
                        <IoIosLogOut />
                        <span>Log out</span>
                    </NavLink>
                </nav>
            )}
        </nav>
    )
}