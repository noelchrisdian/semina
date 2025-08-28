import { toast } from "react-toastify";

const handlerError = (error, { rethrow = false} = {}) => {
    if (error) {
        let message;
        if (error.response) {
            message = error.response.data?.message || 'Something went wrong, try again later';
            if (typeof message === 'string') toast.error(message);

            if (rethrow) return Promise.reject(error);
        } else {
            toast.error(error.message) || 'Something went wrong, try again later';
        }
    }
    return;
}

export { handlerError };