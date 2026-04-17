import { useAtom } from "jotai";
import { tokenAtom, userAtom } from "../../atom/atom.js";
import { Navigate } from "react-router";
import { useEffect, useState } from "react";
import { fetchJson } from "../../services/apiClient.js";


export default function ProtectedRoute({ children }) {
    const [user] = useAtom(userAtom);
    const [token] = useAtom(tokenAtom);
    const [isLoading, setIsLoading] = useState(true);
    const [isValidToken, setIsValidToken] = useState(false);

    useEffect(() => {
        const verifyToken = async () => {
            if (!token) {
                setIsLoading(false);
                return;
            }

            try {
                // Appeler la route protected
                await fetchJson("/protected", {
                    method: "GET",
                    token
                })

                setIsValidToken(true);

            } catch (error) {
                if (error.status === 401) {
                    setIsValidToken(false);
                } else {
                    console.error("Erreur inattendue:", error);
                }
                
            } finally {
                setIsLoading(false);
            }
        }

        verifyToken();

    }, [token]);

    if (isLoading) return <div>Chargement...</div>;


    if (!user || !token || !isValidToken) {
        return <Navigate to="/" replace />;
    };

    return children;
}