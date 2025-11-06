import { useActionState } from "react";
import styles from "./register.module.css";
import useAuth from "../../../hooks/useAuth.js";
import { validatePassword } from "../../../utils/validation.js";


export default function RegisterForm({ setSwitchForm }) {
    // todo: exemple connection DB
    const { fetchRegister } = useAuth();

    async function registerAction(prevState, formData) {
        const data = {
            username: formData.get("username"),
            email: formData.get("email"),
            password: formData.get("password"),
            confirmPassword: formData.get("confirmPassword")
        };

        const errors = {};
        if (!data.username) errors.username = "Required";
        if (!data.email) errors.email = "Required";
        if (!data.password) {
            errors.password = "Required";
        } else if (!validatePassword(data.password)) {
            errors.password = "Password must be at least 8 characters, include an uppercase letter, a number, and a special character.";
        };
        if (!data.confirmPassword) errors.confirmPassword = "Required";
        if (data.password !== data.confirmPassword) errors.password = "Password do not match";

        if (Object.keys(errors).length > 0) {
            return {
                data: null,
                errors,
                message: "All fields are required.",
                success: false
            }
        };

        // todo: Connection with DB
        try {
            await fetchRegister(data.username, data.email, data.password);
            // navigate("/wherever-you-like");
            // more stuff to do...

            return {
                data,
                errors: {},
                message: "Form submitted successfully.",
                success: true
            };

        } catch (error) {
            return {
                data: null,
                errors,
                message: error.message || "Connection failed : invalid credentials.",
                success: false
            }
        }
    };

    const initialData = { data: null, errors: {}, message: null };
    const [state, handleForm, isPending] = useActionState(registerAction, initialData);

    return (
        <form action={handleForm} className={styles.form}>
            <h4 className={styles.title}>Create an account</h4>
            <div className={styles.input_group}>
                <label htmlFor="username">
                    <span>Username</span>
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
                    <span>Password</span>
                    {state.errors?.password && (<span className={styles.required}>{state.errors.password}</span>)}
                </label>
                <input type="password" id="password" name="password" />
            </div>
            <div className={styles.input_group}>
                <label htmlFor="confirmPassword">
                    <span>Confirm password</span>
                    {state.errors?.confirmPassword && (<span className={styles.required}>{state.errors.confirmPassword}</span>)}
                </label>
                <input type="password" id="confirmPassword" name="confirmPassword" />
            </div>

            <button className={styles.btn_submit} type="submit" disabled={isPending}>{isPending ? "Signing up.." : "Sign up"}</button>
            {/* {state.message && (
                <p className={state.success ? styles.success_msg : styles.error_msg}>{state.message}</p>
            )} */}

            <div className={styles.register_link}>
                <p>Already have an account ?</p>
                <button type="button" className={styles.btn_switch} onClick={() => setSwitchForm(true)}>Sign in</button>
            </div>
        </form>
    )
}