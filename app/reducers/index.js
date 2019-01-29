import { combineReducers } from 'redux';
import UserReducer from "./userReducer";
import ProductReducer from "./productReducer";
import CategoryReducer from './categoryReducer';
import SubcategoryReducer from './subcategoryReducer';
import AddtocartReducer from './addtocartReducer';

const appReducer = combineReducers({
    user: UserReducer,
    product:ProductReducer,
    category:CategoryReducer,
    subcategory:SubcategoryReducer,
    addtocart:AddtocartReducer
});

export default appReducer;
