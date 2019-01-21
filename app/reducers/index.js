import { combineReducers } from 'redux';
import UserReducer from "./userReducer";
import ProductReducer from "./productReducer";
import CategoryReducer from './categoryReducer';

const appReducer = combineReducers({
    user: UserReducer,
    product:ProductReducer,
    category:CategoryReducer
});

export default appReducer;
