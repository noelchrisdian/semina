import { CLEAR_NOTIF, SET_NOTIF } from "./constants";

const setNotif = (status, typeNotif, message) => {
    return {
        type: SET_NOTIF,
        status,
        typeNotif,
        message
    }
}

const clearNotif = () => {
    return {
        type: CLEAR_NOTIF
    }
}

export { clearNotif, setNotif };