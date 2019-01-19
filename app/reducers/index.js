import { combineReducers } from 'redux';
import UserReducer from "./userReducer";
import ProductReducer from "./productReducer";

const appReducer = combineReducers({
    user: UserReducer,
    product:ProductReducer
});

export default appReducer;
