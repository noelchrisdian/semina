import debounce from "debounce-promise";
import { clearNotif } from "../notif/action";
import {
    ERROR_FETCHING_EVENTS,
    SET_CATEGORY,
    SET_KEYWORD,
    SET_TALENT,
    START_FETCHING_EVENTS,
    SUCCESS_FETCHING_EVENTS
} from "./constants";
import { getData } from "../../utils/fetch";

const debounceFetch = debounce(getData, 1000);

const startFetching = () => {
    return {
        type: START_FETCHING_EVENTS
    }
}

const successFetching = ({ events }) => {
    return {
        type: SUCCESS_FETCHING_EVENTS,
        events
    }
}

const errorFetching = () => {
    return {
        type: ERROR_FETCHING_EVENTS
    }
}

const setKeyword = ({ keyword }) => {
    return {
        type: SET_KEYWORD,
        keyword
    }
}

const setCategory = ({ category }) => {
    return {
        type: SET_CATEGORY,
        category
    }
}

const setTalent = ({ talent }) => {
    return {
        type: SET_TALENT,
        talent
    }
}

const fetchEvents = () => {
    return async (dispatch, getState) => {
        dispatch(startFetching());

        try {
            setTimeout(() => {
                dispatch(clearNotif());
            }, 3000)

            const params = {
                category: getState().events?.category?.value || '',
                keyword: getState().events.keyword,
                talent: getState().events?.talent?.value || ''
            }

            const response = await debounceFetch('events', params);
            response.data.data.forEach((data) => {
                data.categoryName = data?.category?.name ?? '';
                data.talentName = data?.talent?.name ?? '-';
            })

            dispatch(successFetching({
                events: response.data.data
            }))
        } catch {
            dispatch(errorFetching());
        }
    }
}

export {
    fetchEvents,
    setCategory,
    setKeyword,
    setTalent
}