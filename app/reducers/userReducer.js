import {SET_USER_LIST,
    SET_LOADER,
    SET_USER_DATA,
    REMOVE_CONTACT,
    SET_LOGIN_DATA
} from "../actions/types";

const INITIAL_STATE = {
    userList: [],
    loading: false,
    userData: {}
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_USER_LIST:{
            return{
                ...state,
                userList: action.payload
            }
        }
        case SET_LOADER:{
            return{
                ...state,
                loading: action.payload
            }
        }
        case SET_USER_DATA:{
            return{
                ...state,
                userData: action.payload
            }
        }
        case REMOVE_CONTACT:{
            return{
                ...state
            }
        }
        case SET_LOGIN_DATA:{
            return{
                ...state,
                userList: action.payload
            }
        }
        default:
            return state
    }
}