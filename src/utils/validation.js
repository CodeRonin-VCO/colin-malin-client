// Regex pour valider un mot de passe (au moins 8 caractères, une majuscule, un chiffre et un caractère spécial). La fonction retourne true si le mot de passe est valide.
export const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

export function validatePassword(password) {
    if (typeof password !== 'string') return false;
    return passwordRegex.test(password);
}