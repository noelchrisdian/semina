import { store } from "./store";

let currentAuth;
const listener = () => {
    const prevAuth = currentAuth;
    currentAuth = store.getState().auth;
    if (currentAuth !== prevAuth) {
        localStorage.setItem('auth', JSON.stringify(currentAuth));
    }
}

const listen = () => {
    store.subscribe(listener)
}

export { listen };