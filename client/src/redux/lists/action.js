import debounce from "debounce-promise";
import {
    ERROR_FETCHING_LISTS_CATEGORIES,
    ERROR_FETCHING_LISTS_EVENTS,
    ERROR_FETCHING_LISTS_TALENTS,
    SUCCESS_FETCHING_LISTS_CATEGORIES,
    SUCCESS_FETCHING_LISTS_EVENTS,
    SUCCESS_FETCHING_LISTS_TALENTS,
    START_FETCHING_LISTS_CATEGORIES,
    START_FETCHING_LISTS_EVENTS,
    START_FETCHING_LISTS_TALENTS
} from "./constants";
import { getData } from "../../utils/fetch";

const debounceCategories = debounce(getData, 1000)
const debounceEvents = debounce(getData, 1000)
const debounceTalents = debounce(getData, 1000)

const startFetchingCategories = () => {
    return {
        type: START_FETCHING_LISTS_CATEGORIES
    }
}

const successFetchingCategories = ({ categories }) => {
    return {
        type: SUCCESS_FETCHING_LISTS_CATEGORIES,
        categories
    }
}

const errorFetchingCategories = () => {
    return {
        type: ERROR_FETCHING_LISTS_CATEGORIES
    }
}

const fetchListsCategories = () => {
    return async (dispatch) => {
        dispatch(startFetchingCategories());

        try {
            const response = await debounceCategories('categories');
            const temp = [];

            response.data.data.forEach((data) => {
                temp.push({
                    value: data._id,
                    label: data.name,
                    target: { value: data._id, name: 'category' }
                })
            })

            dispatch(successFetchingCategories({
                categories: temp
            }))
        } catch {
            dispatch(errorFetchingCategories())
        }
    }
}

const startFetchingEvents = () => {
    return {
        type: START_FETCHING_LISTS_EVENTS
    }
}

const successFetchingEvents = ({ events }) => {
    return {
        type: SUCCESS_FETCHING_LISTS_EVENTS,
        events
    }
}

const errorFetchingEvents = () => {
    return {
        type: ERROR_FETCHING_LISTS_EVENTS
    }
}

const fetchListsEvents = () => {
    return async (dispatch) => {
        dispatch(startFetchingEvents());

        try {
            const response = await debounceEvents('events');
            const temp = [];

            response.data.data.forEach((data) => {
                temp.push({
                    value: data._id,
                    label: data.title,
                    target: { value: data._id, name: 'event' }
                })
            })

            dispatch(successFetchingEvents({
                events: temp
            }))
        } catch {
            dispatch(errorFetchingEvents());
        }
    }
}

const startFetchingTalents = () => {
    return {
        type: START_FETCHING_LISTS_TALENTS
    }
}

const successFetchingTalents = ({ talents }) => {
    return {
        type: SUCCESS_FETCHING_LISTS_TALENTS,
        talents
    }
}

const errorFetchingTalents = () => {
    return {
        type: ERROR_FETCHING_LISTS_TALENTS
    }
}

const fetchListsTalents = () => {
    return async (dispatch) => {
        dispatch(startFetchingTalents());

        try {
            const response = await debounceTalents('talents');
            const temp = [];

            response.data.data.forEach((data) => {
                temp.push({
                    value: data._id,
                    label: data.name,
                    target: { value: data._id, name: 'talent' }
                })
            })

            dispatch(successFetchingTalents({
                talents: temp
            }))
        } catch {
            dispatch(errorFetchingTalents());
        }
    }
}

export {
    fetchListsCategories,
    fetchListsEvents,
    fetchListsTalents
}