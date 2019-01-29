import { SET_ADDTOCART_LIST, SET_LOADER} from "../actions/types";

const INITIAL_STATE = {
    cartList: [],
    loading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_ADDTOCART_LIST:{
            return{
                ...state,
                cartList: action.payload
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