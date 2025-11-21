import { useAtom } from "jotai";
import { tokenAtom, userAtom } from "../../atom/atom.js";
import { Navigate } from "react-router";


export default function ProtectedRoute({ children }) {
    const [user] = useAtom(userAtom);
    const [token] = useAtom(tokenAtom);

    if (!user || !token) {
        return <Navigate to="/" replace />;
    };

    return children;
}