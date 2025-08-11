import debounce from "debounce-promise";
import { clearNotif } from "../notif/action";
import {
    ERROR_FETCHING_CATEGORIES,
    START_FETCHING_CATEGORIES,
    SUCCESS_FETCHING_CATEGORIES
} from "./constants";
import { getData } from "../../utils/fetch";

const debounceFetch = debounce(getData, 1000);

const startFetching = () => {
    return {
        type: START_FETCHING_CATEGORIES
    }
}

const successFetching = ({ categories }) => {
    return {
        type: SUCCESS_FETCHING_CATEGORIES,
        categories
    }
}

const errorFetching = () => {
    return {
        type: ERROR_FETCHING_CATEGORIES
    }
}

const fetchCategories = () => {
    return async (dispatch) => {
        dispatch(startFetching());
        try {
            setTimeout(() => {
                dispatch(clearNotif());
            }, 3000)

            const response = await debounceFetch('categories')
            dispatch(successFetching({
                categories: response.data.data
            }))
        } catch {
            dispatch(errorFetching());
        }
    }
}

export {
    errorFetching,
    fetchCategories,
    startFetching,
    successFetching
}