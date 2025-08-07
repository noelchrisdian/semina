import { applyMiddleware, combineReducers, compose, legacy_createStore as createStore } from "redux";
import { thunk } from "redux-thunk";
import { reducer as authReducer } from "./auth/reducer";
import { reducer as categoryReducer } from "./categories/reducer";
import { reducer as notifReducer } from "./notif/reducer";

const composerEnchancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    auth: authReducer,
    categories: categoryReducer,
    notif: notifReducer
})
const store = createStore(rootReducer, composerEnchancer(applyMiddleware(thunk)))

export { store };