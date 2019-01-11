import { combineReducers } from 'redux';
import UserReducer from "./userReducer";

const appReducer = combineReducers({
    user: UserReducer,
});

export default appReducer;
