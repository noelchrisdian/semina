import {
    ERROR_FETCHING_EVENTS,
    SET_CATEGORY,
    SET_KEYWORD,
    SET_TALENT,
    START_FETCHING_EVENTS,
    SUCCESS_FETCHING_EVENTS    
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
    category: '',
    talent: '',
    status: statusList.idle
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case START_FETCHING_EVENTS:
            return { ...state, status: statusList.process };
        case ERROR_FETCHING_EVENTS:
            return { ...state, status: statusList.error };
        case SUCCESS_FETCHING_EVENTS:
            return {
                ...state,
                status: statusList.success,
                data: action.events
            }
        case SET_CATEGORY:
            return {
                ...state,
                category: action.category
            }
        case SET_KEYWORD:
            return {
                ...state,
                keyword: action.keyword
            }
        case SET_TALENT:
            return {
                ...state,
                talent: action.talent
            }
        default: 
            return state
    }
}

export { reducer };