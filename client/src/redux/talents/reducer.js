import {
    ERROR_FETCHING_TALENTS,
    SET_KEYWORD,
    START_FETCHING_TALENTS,
    SUCCESS_FETCHING_TALENTS
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
        case START_FETCHING_TALENTS:
            return { ...state, status: statusList.process };
        case ERROR_FETCHING_TALENTS:
            return { ...state, status: statusList.error };
        case SUCCESS_FETCHING_TALENTS:
            return {
                ...state,
                status: statusList.success,
                data: action.talents
            }
        case SET_KEYWORD:
            return {
                ...state,
                keyword: action.keyword
            }
        default:
            return state;
    }
}

export { reducer };