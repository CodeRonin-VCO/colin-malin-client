export function handleExpiredToken(error, setToken, setUser, navigate) {
    if (error?.status === 401) {
        setToken(null)
        setUser(null)
        navigate("/")

        return true
    };

    return false;
}