import {
    ERROR_FETCHING_ORDERS,
    SET_DATE,
    SET_PAGE,
    START_FETCHING_ORDERS,
    SUCCESS_FETCHING_ORDERS    
} from "./constants";

const statusList = {
    idle: 'idle',
    process: 'process',
    success: 'success',
    error: 'error'
}

const initialState = {
    data: [],
    page: 1,
    limit: 1,
    pages: 1,
    date: {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    },
    status: statusList.idle
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case START_FETCHING_ORDERS:
            return { ...state, status: statusList.process };
        case ERROR_FETCHING_ORDERS:
            return { ...state, status: statusList.error };
        case SUCCESS_FETCHING_ORDERS: 
            return {
                ...state,
                data: action.orders,
                pages: action.pages,
                status: statusList.success
            }
        case SET_DATE:
            return {
                ...state,
                date: action.ranges
            }
        case SET_PAGE:
            return {
                ...state,
                page: action.pages || 1
            }
        default:
            return state
    }
}

export { reducer };