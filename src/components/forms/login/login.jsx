import { useActionState } from "react";
import useAuth from "../../../hooks/useAuth.js";
import styles from "./login.module.css";
import { useNavigate } from "react-router";
import Button from "../../ui/buttons/buttons.jsx";


export default function LoginForm({ setSwitchForm }) {
    const { fetchLogin } = useAuth();
    const navigate = useNavigate();

    async function loginAction(prevState, formData) {
        const data = {
            email: formData.get("email"),
            password: formData.get("password")
        };

        const errors = {};
        if (!data.email) errors.email = "Required";
        if (!data.password) errors.password = "Required";
        if (Object.keys(errors).length > 0) {
            return {
                data: null,
                errors,
                message: "All fields are required."
            }
        };

        try {
            await fetchLogin(data.email, data.password);
            navigate("/getStarted");

            return {
                data,
                errors: {},
                message: "Form submitted successfully."
            };

        } catch (error) {
            return {
                data: null,
                errors,
                message: error.message || "Connection failed : invalid credentials."
            }
        }
    };

    const initialData = { data: null, errors: {}, message: null };
    const [state, handleForm, isPending] = useActionState(loginAction, initialData);

    return (
        <form action={handleForm} className={styles.form}>
            <h4 className={styles.title}>Connecte-toi à ton compte</h4>
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

            {state.message && (
                <p className={state.success ? styles.success_msg : styles.error_msg}>{state.message}</p>
            )}

            <Button type="submit" variant={"btn_submit"} disabled={isPending}>
                {isPending ? "Logging in..." : "Log in"}
            </Button>

            <div className={styles.register_link}>
                <p>Pas encore de compte ?</p>
                <Button type="button" variant={"btn_switch"} onClick={() => setSwitchForm(false)}>
                    Sign up
                </Button>
            </div>
        </form>
    )
}