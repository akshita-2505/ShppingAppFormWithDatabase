import {
    SET_SUBCATEGORY_LIST,
    SET_LOADER
} from "./types";
import ApiConstant from '../helper/apiConstant';

export const getsubcategory = () => {
    return (dispatch, getState) => {

        return fetch(ApiConstant.baseUrl+ApiConstant.subcategory)
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch({
                    type: SET_SUBCATEGORY_LIST,
                    payload: responseJson.data
                });
                return Promise.resolve(true);
            })
            .catch((error) => {
                alert(error);
            });
    };
};

export const getsubCategoryById = (userData) => {
    return (dispatch, getState) => {
        dispatch({type: SET_LOADER,payload: true});
        return fetch(ApiConstant.baseUrl+ApiConstant.subcategory + userData)
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch({type: SET_LOADER,payload: false});
                dispatch({
                    type: SET_SUBCATEGORY_LIST,
                    payload: responseJson.data
                });
                return Promise.resolve(true);
            })
            .catch((error) => {
                alert(error);
            });
    };
};

export const getsubCategoryByIdOnHome = (userData) => {
    return (dispatch, getState) => {
        dispatch({type: SET_LOADER,payload: true});
        return fetch(ApiConstant.baseUrl+ApiConstant.subcategory + userData)
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch({type: SET_LOADER,payload: false});
                dispatch({
                    type: SET_SUBCATEGORY_LIST,
                    payload: responseJson.data
                });
                return Promise.resolve(true);
            })
            .catch((error) => {
                alert(error);
            });
    };
};
