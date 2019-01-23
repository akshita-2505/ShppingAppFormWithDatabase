import { SET_LOADER,SET_SUBCATEGORY_LIST } from "../actions/types";

const INITIAL_STATE = {
    subcategoryList: [],
    loading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_SUBCATEGORY_LIST:{
            return{
                ...state,
                subcategoryList: action.payload
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