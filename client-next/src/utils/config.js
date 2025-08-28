import axios from "axios";
import { handlerError } from "./error";

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
})
instance.interceptors.response.use((response) => response.data, handlerError);

export { instance };