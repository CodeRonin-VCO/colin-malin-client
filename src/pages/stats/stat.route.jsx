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
import ProfileDashboard from "../../components/dashboard/profile/profile.jsx";
import PreferencesDashboard from "../../components/dashboard/preferences/preferences.jsx";
import Button from "../../components/ui/buttons/buttons.jsx";

export default function StatPage() {
    const [user] = useAtom(userAtom);
    const [isSelected, setIsSelected] = useState("overview");


    return (
        <div className="page">
            <HeaderLayout />
            <main className={styles.main}>
                <div className={styles.sidebar}>
                    <Button
                        type="button"
                        variant={"dash_item"}
                        state={"user_profile"}
                    >
                        <span><FaUserCircle /></span>
                        <span>{user?.username || "Coolest User"}</span>
                    </Button>
                    <Button
                        type="button"
                        onClick={() => setIsSelected("overview")}
                        variant={"dash_item"}
                        state={isSelected === "overview" ? "isSelected" : ""}
                    >
                        <span><FaChartBar /></span>
                        <span>Aperçu</span>
                    </Button>
                    <Button
                        type="button"
                        onClick={() => setIsSelected("profile")}
                        variant={"dash_item"}
                        state={isSelected === "profile" ? "isSelected" : ""}
                    >
                        <span><ImProfile /></span>
                        <span>Profil</span>
                    </Button>
                    <Button
                        type="button"
                        onClick={() => setIsSelected("preferences")}
                        variant={"dash_item"}
                        state={isSelected === "preferences" ? "isSelected" : ""}
                    >
                        <span><FaGears /></span>
                        <span>Préférences</span>
                    </Button>
                </div>
                <div className={styles.dash_tiles}>
                    {isSelected === "overview" && (<OverviewDashboard />)}
                    {isSelected === "profile" && (<ProfileDashboard />)}
                    {isSelected === "preferences" && (<PreferencesDashboard />)}
                </div>
            </main>
            <FooterLayout />
        </div>
    )
}