import {
    SET_CATEGORY_LIST,
    SET_LOADER
} from "./types";
import ApiConstant from '../helper/apiConstant';

export const getcategory = () => {
    return (dispatch, getState) => {

        return fetch(ApiConstant.baseUrl+ApiConstant.product)
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch({
                    type: SET_CATEGORY_LIST,
                    payload: responseJson.data
                });
                return Promise.resolve(true);
            })
            .catch((error) => {
                alert(error);
            });
    };
};

export const getCategoryById = (userData) => {
    return (dispatch, getState) => {
        dispatch({type: SET_LOADER,payload: true});
        return fetch(ApiConstant.baseUrl+ApiConstant.user + userData.id)
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch({type: SET_LOADER,payload: false});
                dispatch({
                    type: SET_CATEGORY_LIST,
                    payload: responseJson.data
                });
                return Promise.resolve(true);
            })
            .catch((error) => {
                alert(error);
            });
    };
};

