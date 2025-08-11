import {
    ERROR_FETCHING_PAYMENTS,
    START_FETCHING_PAYMENTS,
    SUCCESS_FETCHING_PAYMENTS
} from "./constants";

const statusList = {
    idle: 'idle',
    process: 'process',
    success: 'success',
    error: 'error'
}

const initialState = {
    data: [],
    keyword: '',
    status: statusList.idle
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case START_FETCHING_PAYMENTS:
            return { ...state, status: statusList.process };
        case ERROR_FETCHING_PAYMENTS:
            return {...state, status: statusList.error}
        case SUCCESS_FETCHING_PAYMENTS:
            return {
                ...state,
                data: action.payments,
                status: statusList.success
            }
        default:
            return state;
    }
}

export { reducer };