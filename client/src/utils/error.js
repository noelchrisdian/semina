import axios from "axios";

const handleError = async (error) => {
    const originalRequest = error.config;
    if (error?.response?.data?.message === 'jwt expired' && !originalRequest._retry) {
        originalRequest._retry = true;
        const session = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

        try {
            const response = await axios.get(`/api/refresh-token/${session.refreshToken}`)
            localStorage.setItem('auth', JSON.stringify({
                ...session,
                token: response.data.data.token,
                refreshToken: response.data.data.refreshToken
            }))

            originalRequest.headers.Authorization = `Bearer ${response.data.data.token}`;
            return axios(originalRequest);
        } catch (e) {
            window.location.href = '/login';
            localStorage.removeItem('auth');
            return Promise.reject(e);
        }
    }

    return error;
}

export { handleError };