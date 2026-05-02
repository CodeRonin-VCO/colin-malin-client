import { useActionState } from "react";
import styles from "./register.module.css";
import useAuth from "../../../hooks/useAuth.js";
import { validatePassword } from "../../../utils/validation.js";
import { useNavigate } from "react-router";
import Button from "../../ui/buttons/buttons.jsx";


export default function RegisterForm({ setSwitchForm }) {
    const { fetchRegister } = useAuth();
    const navigate = useNavigate();

    async function registerAction(prevState, formData) {
        const data = {
            username: formData.get("username"),
            email: formData.get("email"),
            password: formData.get("password"),
            confirmPassword: formData.get("confirmPassword")
        };

        const errors = {};
        if (!data.username) errors.username = "Requis";
        if (!data.email) errors.email = "Requis";
        if (!data.password) {
            errors.password = "Requis";
        } else if (!validatePassword(data.password)) {
            errors.password = "Le mot de passe doit comporter au moins 8 caractères et inclure une lettre majuscule, un chiffre et un caractère spécial.";
        };
        if (!data.confirmPassword) errors.confirmPassword = "Requis";
        if (data.password !== data.confirmPassword) errors.password = "Les mots de passe ne correspondent pas.";

        if (Object.keys(errors).length > 0) {
            return {
                data: null,
                errors,
                message: "Tous les champs sont obligatoires.",
                success: false
            }
        };

        try {
            await fetchRegister(data.username, data.email, data.password);
            navigate("/accueil");

            return {
                data,
                errors: {},
                message: "Le formulaire a été envoyé avec succès.",
                success: true
            };

        } catch (error) {
            return {
                data: null,
                errors,
                message: error.message || "Échec de la connexion : identifiants non valides.",
                success: false
            }
        }
    };

    const initialData = { data: null, errors: {}, message: null };
    const [state, handleForm, isPending] = useActionState(registerAction, initialData);

    return (
        <form action={handleForm} className={styles.form}>
            <h4 className={styles.title}>Crée un compte</h4>
            <div className={styles.input_group}>
                <label htmlFor="username">
                    <span>Nom d'utilisateur</span>
                    {state.errors?.username && (<span className={styles.required}>{state.errors.username}</span>)}

                </label>
                <input type="text" id="username" name="username" />
            </div>
            <div className={styles.input_group}>
                <label htmlFor="email">
                    <span>Email</span>
                    {state.errors?.email && (<span className={styles.required}>{state.errors.email}</span>)}
                </label>
                <input type="email" id="email" name="email" />
            </div>
            <div className={styles.input_group}>
                <label htmlFor="password">
                    <span>Mot de passe</span>
                    {state.errors?.password && (<span className={styles.required}>{state.errors.password}</span>)}
                </label>
                <input type="password" id="password" name="password" />
            </div>
            <div className={styles.input_group}>
                <label htmlFor="confirmPassword">
                    <span>Confirme le mot de passe</span>
                    {state.errors?.confirmPassword && (<span className={styles.required}>{state.errors.confirmPassword}</span>)}
                </label>
                <input type="password" id="confirmPassword" name="confirmPassword" />
            </div>

            {state.message && (
                <p className={state.success ? styles.success_msg : styles.error_msg}>{state.message}</p>
            )}
            
            <Button type="submit" variant={"btn_submit"} disabled={isPending}>
                {isPending ? "Inscription en cours..." : "S'inscrire"}
            </Button>


            <div className={styles.register_link}>
                <p>Déjà un compte ?</p>
                <Button type="button" variant={"btn_switch"} onClick={() => setSwitchForm(true)}>
                    Se connecter
                </Button>
            </div>
        </form>
    )
}