import { SET_LOADER,SET_CATEGORY_LIST } from "../actions/types";

const INITIAL_STATE = {
    categoryList: [],
    loading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_CATEGORY_LIST:{
            return{
                ...state,
                productList: action.payload
            }
        }
        case SET_LOADER:{
            return{
                ...state,
                loading: action.payload
            }
        }

        default:
            return state;
    }
}