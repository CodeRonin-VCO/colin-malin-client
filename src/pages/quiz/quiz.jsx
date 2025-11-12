import { useAtom } from "jotai";
import FooterLayout from "../../layouts/footer/footer.jsx";
import HeaderLayout from "../../layouts/header/header.jsx";
import styles from "./quiz.module.css";
import { gameConfigAtom } from "../../atom/atom.js";
import ConfigPopup from "../../components/modal/popup-config/popup-config.jsx";
import { useState } from "react";
import SoloGame from "../../components/games/solo/solo.jsx";

export default function QuizPage() {
    const [gameConfig] = useAtom(gameConfigAtom);
    const [gameHasStarted, setGamehasStarted] = useState(false);


    return (
        <div className="page">
            <HeaderLayout />
            <main className={styles.main}>
                {!gameHasStarted && (
                    <ConfigPopup gameConfig={gameConfig} setGamehasStarted={setGamehasStarted} />
                )}
                {gameHasStarted && (
                    <SoloGame />
                )}
            </main>
            <FooterLayout />
        </div>
    )
}