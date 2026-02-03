

export function handleExpiredToken(error, setToken, setUser, navigate) {
    // Todo: vérifier si cela fonctionne après expiration du token
    // if (error.response?.status === 401 || error.message.includes("401")) {
    if (error?.status === 401) {
        setToken(null)
        setUser(null)
        navigate("/")

        return true
    };

    return false;
}