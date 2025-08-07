import { CLEAR_NOTIF, SET_NOTIF } from "./constants";

const initialState = {
    status: false,
    typeNotif: '',
    message: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CLEAR_NOTIF:
            return {
                state: initialState
            }
        case SET_NOTIF:
            return {
                ...state,
                status: action.status,
                typeNotif: action.typeNotif,
                message: action.message
            }
        default:
            return state;
    }
}

export { reducer };