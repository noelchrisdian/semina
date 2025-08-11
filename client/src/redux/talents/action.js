import debounce from "debounce-promise";
import { clearNotif } from "../notif/action";
import {
    ERROR_FETCHING_TALENTS,
    SET_KEYWORD,
    START_FETCHING_TALENTS,
    SUCCESS_FETCHING_TALENTS
} from "./constants";
import { getData } from "../../utils/fetch";

const debounceFetch = debounce(getData, 1000);

const startFetching = () => {
    return {
        type: START_FETCHING_TALENTS
    }
}

const successFetching = ({ talents }) => {
    return {
        type: SUCCESS_FETCHING_TALENTS,
        talents
    }
}

const errorFetching = () => {
    return {
        type: ERROR_FETCHING_TALENTS
    }
}

const setKeyword = ({ keyword }) => {
    return {
        type: SET_KEYWORD,
        keyword
    }
}

const fetchTalents = () => {
    return async (dispatch, getState) => {
        dispatch(startFetching());
        try {
            setTimeout(() => {
                dispatch(clearNotif());
            }, 3000)

            const params = {
                keyword: getState().talents.keyword
            }

            const response = await debounceFetch('talents', params);
            response.data.data.forEach((data) => {
                data.avatar = data.image.name
            })
            dispatch(successFetching({
                talents: response.data.data
            }))
        } catch {
            dispatch(errorFetching());
        }
    }
}

export {
    errorFetching,
    fetchTalents,
    setKeyword,
    startFetching,
    successFetching
}