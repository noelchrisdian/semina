import { USER_LOGIN, USER_LOGOUT } from "./constants"

const login = (token, role ) => {
    return {
        type: USER_LOGIN,
        token,
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