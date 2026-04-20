import { NavLink, useNavigate } from "react-router";
import styles from "./nav-desktop.module.css";
import { IoIosLogOut } from "react-icons/io";
import useAuth from "../../../hooks/useAuth.js";
import { useAtom } from "jotai";
import { userAtom } from "../../../atom/atom.js";


export default function NavDesktop() {
    const { fetchLogout } = useAuth();
    const [user] = useAtom(userAtom);
    const navigate = useNavigate();

    const handleLogout = async (e) => {
        e.preventDefault(); 
        await fetchLogout(); 
        navigate("/");
    };

    return (
        <nav className={styles.nav}>
            <NavLink to={"/getStarted"} className={({ isActive }) => isActive ? styles.active : ""}>Accueil</NavLink>
            <NavLink to={"/quiz-config"} className={({ isActive }) => isActive ? styles.active : ""}>Quiz</NavLink>
            <NavLink to={"/stat"} className={({ isActive }) => isActive ? styles.active : ""}>Profil</NavLink>
            {user.role === "admin" && (
                <NavLink to={"/admin"} className={({ isActive }) => isActive ? styles.active : ""}>Admin</NavLink>
            )}
            <NavLink to={"/"} className={({ isActive }) => isActive ? styles.active : ""} title="Log out" onClick={handleLogout}><IoIosLogOut /></NavLink>
        </nav>
    )
}