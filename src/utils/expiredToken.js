

export function handleExpiredToken(error, setToken, setUser, navigate) {
    if (error.response?.status === 401 || error.message.includes("401")) {
        setToken(null)
        setUser(null)
        navigate("/")

        return true
    };

    return false;
}