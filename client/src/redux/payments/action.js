import debounce from "debounce-promise";
import { clearNotif } from "../notif/action";
import {
    ERROR_FETCHING_PAYMENTS,
    START_FETCHING_PAYMENTS,
    SUCCESS_FETCHING_PAYMENTS
} from "./constants";
import { getData } from "../../utils/fetch";

const debounceFetch = debounce(getData, 1000);

const startFetching = () => {
    return {
        type: START_FETCHING_PAYMENTS
    }
}

const successFetching = ({ payments }) => {
    return {
        type: SUCCESS_FETCHING_PAYMENTS,
        payments
    }
}

const errorFetching = () => {
    return {
        type: ERROR_FETCHING_PAYMENTS
    }
}

const fetchPayments = () => {
    return async (dispatch) => {
        dispatch(startFetching());
        try {   
            setTimeout(() => {
                dispatch(clearNotif());
            }, 3000)

            const response = await debounceFetch('payments');
            response.data.data.forEach((data) => {
                data.avatar = data.image?.name
            })
            dispatch(successFetching({
                payments: response.data.data
            }))
        } catch {
            dispatch(errorFetching())
        }
    }
}

export { fetchPayments };