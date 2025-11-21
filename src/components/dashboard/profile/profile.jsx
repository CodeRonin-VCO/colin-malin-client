import { useAtom } from "jotai";
import styles from "./profile.module.css";
import { userAtom } from "../../../atom/atom.js";
import { useState } from "react";
import { LuSave } from "react-icons/lu";
import { MdCancelPresentation } from "react-icons/md";
import useAuth from "../../../hooks/useAuth.js";
import Toast from "../../modal/toast-delete/toast-delete.jsx";
import useUser from "../../../hooks/useUser.js";


export default function ProfileDashboard() {
    const [user, setUser] = useAtom(userAtom);
    const { fetchUpdatePassword } = useAuth();
    const {fetchUpdateUser } = useUser();
    const [editingField, setEditingField] = useState(null);
    const [updateField, setUpdateField] = useState({
        username: user.username,
        email: user.email,
        description: user.description,
    });
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [toast, setToast] = useState(null);

    function handleFieldChange(field, value) {
        setUpdateField(prev => ({ ...prev, [field]: value }));
    };

    async function handleUpdatePassword() {
        try {
            await fetchUpdatePassword(oldPassword, newPassword);
            setToast({ message: "Mot de passe mis à jour avec succès.", type: "success" });
            setEditingField(null);
            setOldPassword("");
            setNewPassword("");
        } catch (error) {
            setToast({ message: "Erreur dans la mise à jour du mot de passe", type: "error" });
            console.error(error.message);
        };
    };

    async function handleUpdates(field) {
        const value = updateField[field];

        if (value === "" || value === user[field]) {
            setEditingField(null);
            return;
        };

        try {
            await fetchUpdateUser({ [field]: value });
            setToast({ message: `${field}  mis à jour avec succès.`, type: "success" });
            setUser(prev => ({ ...prev, [field]: value })); // sync UI
            setEditingField(null);

        } catch (error) {
            setToast({ message: `Erreur dans la mise à jour de ${field}`, type: "error" });
            console.error(error.message);
        };
    };


    return (
        <div className={styles.profile}>
            <div className={styles.info_card}>
                <h6>Nom d'utilisateur</h6>
                {editingField === "username" ? (
                    <>
                        <input
                            type="text"
                            value={updateField.username}
                            onChange={(e) => handleFieldChange("username", e.target.value)}
                            className={styles.input}
                        />
                        <div className={styles.btn_container}>
                            <button className={styles.btn_control} onClick={() => setEditingField(null)} title="Annuler"><MdCancelPresentation /></button>
                            <button className={styles.btn_control} title="Sauver" onClick={(e) => handleUpdates("username")}><LuSave /></button>
                        </div>
                    </>

                ) : (
                    <p>{user.username}</p>
                )}
            </div>
            <div className={styles.info_card}>
                <h6>Email</h6>
                {editingField === "email" ? (
                    <>
                        <input
                            type="email"
                            value={updateField.email}
                            onChange={(e) => handleFieldChange("email", e.target.value)}
                            className={styles.input}
                        />
                        <div className={styles.btn_container}>
                            <button className={styles.btn_control} onClick={() => setEditingField(null)} title="Annuler"><MdCancelPresentation /></button>
                            <button className={styles.btn_control} title="Sauver" onClick={(e) => handleUpdates("email")}><LuSave /></button>
                        </div>
                    </>

                ) : (
                    <p>{user.email}</p>
                )}
            </div>
            <div className={styles.info_card}>
                <h6>Mot de passe</h6>
                {editingField === "password" ? (
                    <>
                        <input
                            type="password"
                            onChange={(e) => setOldPassword(e.target.value)}
                            className={styles.input}
                            placeholder="Ancien mdp"
                        />
                        <input
                            type="password"
                            onChange={(e) => setNewPassword(e.target.value)}
                            className={styles.input}
                            placeholder="Nouveau mdp"
                        />
                        <div className={styles.btn_container}>
                            <button
                                className={styles.btn_control}
                                onClick={() => {
                                    setOldPassword("");
                                    setNewPassword("");
                                    setEditingField(null)
                                }}
                                title="Annuler">
                                <MdCancelPresentation />
                            </button>
                            <button className={styles.btn_control} title="Sauver" onClick={(e) => handleUpdatePassword()}><LuSave /></button>
                        </div>
                    </>

                ) : (
                    <p>••••••••</p>
                )}
            </div>
            <div className={styles.info_card}>
                <h6>Membre depuis</h6>
                <p>{new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
            <div className={`${styles.info_card} ${styles.description}`}>
                <h6>Description</h6>
                {editingField === "description" ? (
                    <>
                        <textarea
                            name="description"
                            id="description"
                            value={updateField.description}
                            onChange={(e) => handleFieldChange("description", e.target.value)}
                            className={styles.input}
                            rows={5}
                        ></textarea>
                        <div className={styles.btn_container}>
                            <button className={styles.btn_control} onClick={() => setEditingField(null)} title="Annuler"><MdCancelPresentation /></button>
                            <button className={styles.btn_control} title="Sauver" onClick={(e) => handleUpdates("description")}><LuSave /></button>
                        </div>
                    </>

                ) : (
                    <p>{user.description || "Aucune description"}</p>
                )}
            </div>
            <div className={styles.empty_design}>
                <p>Change tes informations personnelles sur cette page.</p>
            </div>
            <button className={`${styles.btn_update}`} onClick={() => setEditingField("username")}>
                Change ton nom d'utilisateur
            </button>
            <button className={`${styles.btn_update}`} onClick={() => setEditingField("email")}>
                Change ton email
            </button>
            <button className={`${styles.btn_update}`} onClick={() => setEditingField("password")}>
                Change ton mot de passe
            </button>
            <button className={`${styles.btn_update}`} onClick={() => setEditingField("description")}>
                Change ta description
            </button>

            {/* TOAST */}
            {toast && (<Toast message={toast.message} type={toast.type} onDismiss={() => setToast(null)} />)}
        </div>
    )
}