import { combineReducers } from 'redux';
import UserReducer from "./userReducer";
import ProductReducer from "./productReducer";
import CategoryReducer from './categoryReducer';
import SubcategoryReducer from './subcategoryReducer';

const appReducer = combineReducers({
    user: UserReducer,
    product:ProductReducer,
    category:CategoryReducer,
    subcategory:SubcategoryReducer
});

export default appReducer;
