import { USER_LOGIN, USER_LOGOUT } from "./constants"

const login = (token, refreshToken, role ) => {
    return {
        type: USER_LOGIN,
        token,
        refreshToken,
        role
    }
}

const logout = () => {
    localStorage.removeItem('auth');
    return {
        type: USER_LOGOUT
    }
}

export { login, logout };