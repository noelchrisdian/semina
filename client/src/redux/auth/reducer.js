import { USER_LOGIN, USER_LOGOUT } from "./constants"

const initialState = localStorage.getItem('auth')
    ? JSON.parse(localStorage.getItem('auth'))
    : { token: null, refreshToken: null, role: null }

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN: 
            return {
                token: action.token,
                refreshToken: action.refreshToken,
                role: action.role,
            }
        case USER_LOGOUT:
            return {
                token: null,
                refreshToken: null,
                role: null
            }
        default:
            return state;
    }
}

export { reducer };