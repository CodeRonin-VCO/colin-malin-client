import NavDesktop from "../../components/nav/nav-desktop/nav-desktop.jsx";
import NavMobile from "../../components/nav/nav-mobile/nav-mobile.jsx";
import styles from "./header.module.css";


export default function HeaderLayout() {


    return (
        <header className={styles.header}>
            <h1 className={styles.title}>Colin-Malin</h1>
            <div className={styles.navDesktop}>
                <NavDesktop />
            </div>
            <div className={styles.navMobile}>
                <NavMobile />
            </div>
        </header>
    )
}