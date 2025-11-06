import FooterLayout from "../../layouts/footer/footer.jsx";
import HeaderLayout from "../../layouts/header/header.jsx";
import styles from "./getStarted.module.css";
import brain from "./../../assets/brain.png"
import { Link } from "react-router";

export default function GetStartedPage() {


    return (
        <div className="page">
            <HeaderLayout />
            <main>
                <article className={styles.intro}>
                    <div className={styles.container_img}>
                        <div className={styles.brain_img}>
                            <img src={brain} alt="Image d'un cerveau rose représentant des connexions neuronales, inspirant la connaissance" />
                        </div>
                    </div>
                    <div className={styles.content}>
                        <h3>Prêt à tester vos connaissances ?</h3>
                        <p>Défiez vos amis ou jouez seul sur des thèmes variés. Choisissez un quiz, configurez votre partie, et amusez-vous !</p>
                        <Link to={"/quiz-config"} className={styles.btn}>Get started</Link>
                    </div>
                </article>

                <article className={styles.cards_container}>
                    <div className={`${styles.card} ${styles.card_quiz}`}>
                        <h5>A toi de jouer !</h5>
                        <p>Lance-toi dans un quiz solo ou multijoueur</p>
                        <Link to={"/quiz-config"} className={styles.btn}>C'est parti !</Link>
                    </div>
                    <div className={`${styles.card} ${styles.card_stat}`}>
                        <h5>Tes performances</h5>
                        <p>Retrouve ton historique et tes meilleurs scores</p>
                        <Link to={"/stat"} className={styles.btn}>Voir mes stats</Link>
                    </div>
                    <div className={`${styles.card} ${styles.card_admin}`}>
                        <h5>Création de question</h5>
                        <p>Participe à notre base de données et rajoute tes questions.</p>
                        <Link to={"/admin"} className={styles.btn}>Je contribue</Link>
                    </div>
                </article>

                <article className={styles.info_box}>
                    <div className={styles.info_box_left}>
                        <h3>Comment ça marche ?</h3>
                        <h5>4 étapes pour jouer, apprendre et progresser</h5>
                    </div>
                    <div className={styles.info_box_right}>
                        <p className={styles.step_one}>Parcourez notre sélection de thèmes variés, allant de la culture générale aux sciences, en passant par le sport, l’histoire ou encore le cinéma.</p>
                        <p className={styles.step_two}>Configurez votre partie selon vos préférences : mode solo ou multijoueur pour défier vos amis. Vous pouvez aussi ajuster la difficulté et le nombre de questions.</p>
                        <p className={styles.step_three}>Répondez aux questions dans un temps limité, gagnez des points et tentez de battre votre record.</p>
                        <p className={styles.step_four}>Consultez vos statistiques détaillées, suivez votre progression et identifiez vos points forts.</p>
                    </div>
                </article>

                <article className={styles.top_themes}>
                    <h3>Thèmes populaires</h3>
                    <div className={styles.theme_tags}>
                        <span>Culture générale</span>
                        <span>Sciences</span>
                        <span>Histoire</span>
                        <span>Géographie</span>
                        <span>Cinéma</span>
                        <span>Sport</span>
                        <span>Technologies</span>
                    </div>
                </article>

                <article className={styles.about}>
                    <h3>Pourquoi ce quiz ?</h3>
                    <p>Ce projet est né de l’envie de rendre l’apprentissage ludique et accessible. Que vous soyez curieux, compétiteur ou simplement joueur, notre plateforme vous permet de tester vos connaissances tout en vous amusant.</p>
                </article>

                <article className={styles.color_box}>
                    <div className={styles.green_box}>
                        <h3>+300k Users</h3>
                        <p><small>and counting</small></p>
                    </div>
                    <div className={styles.pink_box}>
                        <h3>100% Free!</h3>
                        <p><small>Forever.</small></p>
                    </div>
                    <div className={styles.white_box}>
                        <h3>+10 Thèmes</h3>
                        <p><small>De la culture à la science</small></p>
                    </div>
                    <div className={styles.blue_box}>
                        <h3>+16k Questions</h3>
                        <p><small>Créées par la communauté</small></p>
                    </div>
                </article>

            </main>
            <FooterLayout />
        </div>
    )
}