import { useAtom } from "jotai";
import FooterLayout from "../../layouts/footer/footer.jsx";
import HeaderLayout from "../../layouts/header/header.jsx";
import styles from "./stat.route.module.css";
import { userAtom } from "../../atom/atom.js";
import { FaChartBar, FaUserCircle } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { FaGears } from "react-icons/fa6";

export default function StatPage() {
    const [user] = useAtom(userAtom);


    return (
        <div className="page">
            <HeaderLayout />
            <main className={styles.main}>
                <div className={styles.sidebar}>
                    <button className={`${styles.dash_item} ${styles.user_profile}`}>
                        <span><FaUserCircle /></span>
                        <span>{user?.username || "Coolest User"}</span>
                    </button>
                    <button className={styles.dash_item}>
                        <span><FaChartBar /></span>
                        <span>Aperçu</span>
                    </button>
                    <button className={styles.dash_item}>
                        <span><ImProfile /></span>
                        <span>Profile</span>
                    </button>
                    <button className={styles.dash_item}>
                        <span><FaGears /></span>
                        <span>Préférences</span>
                    </button>
                </div>
                <div className={styles.dash_tiles}>

                </div>
            </main>
            <FooterLayout />
        </div>
    )
}