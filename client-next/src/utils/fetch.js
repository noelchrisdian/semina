import { instance } from "./config"

const getData = (url, params, token) => {
    return instance.get(`${url}`, {
        params,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const postData = (url, payload, token) => {
    return instance.post(`${url}`, payload, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const putData = (url, payload, token) => {
    return instance.put(`${url}`, payload, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export { getData, postData, putData };