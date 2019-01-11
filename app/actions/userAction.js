import {SET_USER_LIST, SET_USER_DATA, SET_LOADER} from "./types";

export const getUser = () => {
    return (dispatch, getState) => {
        return fetch('http://localhost:3000/users')
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch({
                    type: SET_USER_LIST,
                    payload: responseJson.data
                });
                return Promise.resolve(true);
            })
            .catch((error) => {
                alert(error);
            });
    };
};

export const userRegistration = (userData) => {
    return (dispatch, getState) => {
        dispatch({type: SET_LOADER,payload: true});
        return fetch('http://localhost:3000/users',
            {
                method : 'POST',
                headers : {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            }).then((response) => response.json())
            .then((responseJson) => {
                dispatch({type: SET_LOADER,payload: false});
                dispatch({
                    type: SET_USER_DATA,
                    payload: responseJson.data
                });
                return Promise.resolve(true);
            })
            .catch((error) => {
                dispatch({
                    type: SET_LOADER,
                    payload: false
                });
                return Promise.reject(error);
            });
    };
};
