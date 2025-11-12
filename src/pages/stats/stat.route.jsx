import { useAtom } from "jotai";
import FooterLayout from "../../layouts/footer/footer.jsx";
import HeaderLayout from "../../layouts/header/header.jsx";
import styles from "./stat.route.module.css";
import { userAtom } from "../../atom/atom.js";
import { FaChartBar, FaUserCircle } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { FaGears } from "react-icons/fa6";
import { useState } from "react";
import OverviewDashboard from "../../components/dashboard/overview/overview.jsx";

export default function StatPage() {
    const [user] = useAtom(userAtom);
    const [isSelected, setIsSelected] = useState("overview");


    return (
        <div className="page">
            <HeaderLayout />
            <main className={styles.main}>
                <div className={styles.sidebar}>
                    <button className={`${styles.dash_item} ${styles.user_profile}`}>
                        <span><FaUserCircle /></span>
                        <span>{user?.username || "Coolest User"}</span>
                    </button>
                    <button className={`${styles.dash_item} ${isSelected === "overview" ? styles.isSelected : ""}`} onClick={() => setIsSelected("overview")}>
                        <span><FaChartBar /></span>
                        <span>Aperçu</span>
                    </button>
                    <button className={`${styles.dash_item} ${isSelected === "profile" ? styles.isSelected : ""}`} onClick={() => setIsSelected("profile")}>
                        <span><ImProfile /></span>
                        <span>Profil</span>
                    </button>
                    <button className={`${styles.dash_item} ${isSelected === "preferences" ? styles.isSelected : ""}`} onClick={() => setIsSelected("preferences")}>
                        <span><FaGears /></span>
                        <span>Préférences</span>
                    </button>
                </div>
                <div className={styles.dash_tiles}>
                    {isSelected === "overview" && (<OverviewDashboard />)}
                </div>
            </main>
            <FooterLayout />
        </div>
    )
}