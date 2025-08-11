import { applyMiddleware, combineReducers, compose, legacy_createStore as createStore } from "redux";
import { thunk } from "redux-thunk";
import { reducer as authReducer } from "./auth/reducer";
import { reducer as categoryReducer } from "./categories/reducer";
import { reducer as notifReducer } from "./notif/reducer";
import { reducer as paymentReducer } from "./payments/reducer";
import { reducer as talentReducer } from "./talents/reducer";

const composerEnchancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    auth: authReducer,
    categories: categoryReducer,
    notif: notifReducer,
    payments: paymentReducer,
    talents: talentReducer
})
const store = createStore(rootReducer, composerEnchancer(applyMiddleware(thunk)))

export { store };