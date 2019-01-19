import { SET_PRODUCT_LIST, SET_LOADER,SET_PRODUCT_DATA,DELETE_PRODUCT_DATA,UPDATE_PRODUCT_DATA } from "../actions/types";

const INITIAL_STATE = {
    productList: [],
    loading: false,
    productData : []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_PRODUCT_LIST:{
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
        case SET_PRODUCT_DATA:{
            return{
                ...state,
                productData: action.payload
            }
        }
        case DELETE_PRODUCT_DATA:{
            return{
                ...state,
                productList: action.payload
            }
        }
        case UPDATE_PRODUCT_DATA:{
            return{
                ...state,
                productList: action.payload
            }
        }

        default:
            return state;
    }
}