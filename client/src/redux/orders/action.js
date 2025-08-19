import debounce from "debounce-promise";
import moment from "moment";
import { clearNotif } from "../notif/action";
import {
    ERROR_FETCHING_ORDERS,
    SET_DATE,
    SET_PAGE,
    START_FETCHING_ORDERS,
    SUCCESS_FETCHING_ORDERS
} from "./constants";
import { getData } from "../../utils/fetch";

const debounceFetch = debounce(getData, 1000);

const startFetching = () => {
    return {
        type: START_FETCHING_ORDERS
    }
}

const successFetching = ({ orders, pages }) => {
    return {
        type: SUCCESS_FETCHING_ORDERS,
        orders,
        pages
    }
}

const errorFetching = () => {
    return {
        type: ERROR_FETCHING_ORDERS
    }
}

const fetchOrders = () => {
    return async (dispatch, getState) => {
        dispatch(startFetching());

        try {
            setTimeout(() => {
                dispatch(clearNotif());
            }, 3000)

            const temp = [];

            const params = {
                page: getState().orders?.page || 1,
                limit: getState().orders?.limit || 10,
                startDate: moment(getState().orders?.date?.startDate).format('YYYY-MM-DD'),
                endDate: moment(getState().orders?.date?.endDate).format('YYYY-MM-DD')
            }
            const response = await debounceFetch('orders', params);
            response.data.data.order.forEach((data) => {
                temp.push({
                    name: `${data.personalDetails.firstName} ${data.personalDetails.lastName}`,
                    email: data.personalDetails.email,
                    title: data.historyEvent.title,
                    date: data.historyEvent.date,
                    orderDate: moment(data.date).format('DD-MM-YYYY, h:mm:ss a'),
                    venueName: data.historyEvent.venueName
                })
            })
            
            dispatch(successFetching({
                orders: temp,
                pages: response.data.data.pages
            }))
        } catch {
            dispatch(errorFetching());
        }
    }
}

const setDate = (ranges) => {
    return {
        type: SET_DATE,
        ranges
    }
}

const setPage = (page) => {
    return {
        type: SET_PAGE,
        page
    }
}

export { fetchOrders, setDate, setPage };