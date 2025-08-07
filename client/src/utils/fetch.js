import axios from "axios";
import { handleError } from "./error";

const getData = async (url, params) => {
    try {
        const { token } = localStorage.getItem('auth')
            ? JSON.parse(localStorage.getItem('auth'))
            : {}
        
        return await axios.get(`/api/${url}`, {
            params,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    } catch (error) {
        handleError(error);
    }
}

const postData = async (url, payload, data = false) => {
    const { token } = localStorage.getItem('auth')
        ? JSON.parse(localStorage.getItem('auth'))
        : {}
    
    return await axios.post(`/api/${url}`, payload, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": data ? 'multipart/form-data' : 'application/json'
        }
    })
}

const putData = async (url, payload) => {
    const { token } = localStorage.getItem('auth')
        ? JSON.parse(localStorage.getItem('auth'))
        : {}

    return await axios.put(`/api/${url}`, payload, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const deleteData = async (url) => {
    const { token } = localStorage.getItem('auth')
        ? JSON.parse(localStorage.getItem('auth'))
        : {}

    return await axios.delete(`/api/${url}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export { getData, postData, putData, deleteData };