import {SET_USER_LIST,
    SET_USER_DATA,
    SET_LOADER,
    REMOVE_CONTACT,
    SET_LOGIN_DATA
    } from "./types";

export const getUser = () => {
    return (dispatch, getState) => {
        dispatch({type: SET_LOADER,payload: true});
        return fetch('http://localhost:3000/users')
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch({type: SET_LOADER,payload: false});
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

export const getUserById = (userData) => {
    return (dispatch, getState) => {
        dispatch({type: SET_LOADER,payload: true});
        return fetch('http://localhost:3000/users/' + userData.id)
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch({type: SET_LOADER,payload: false});
                dispatch({
                    type: SET_USER_DATA,
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

export const deleteUser = (userData) => {
    return (dispatch, getState) => {
        dispatch({type: REMOVE_CONTACT,
            payload: true});
        return fetch('http://localhost:3000/users/' + userData.id ,
            {
                method : 'DELETE',
                headers : {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then((response) => response.json())
            .then((responseJson) => {
                dispatch({type: SET_LOADER,payload: false});
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

export const updateUser = (userData) => {
    return (dispatch, getState) => {
        dispatch({type: SET_LOADER,payload: true});
        return fetch('http://localhost:3000/users/'+ userData.id,
            {
                method : 'PUT',
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

export const userLogin = (userData) => {
    return (dispatch, getState) => {
        return fetch('http://localhost:3000/users/login/',
            {
                method : 'POST',
                headers : {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            }).then((response) => response.json())
            .then((responseJson) => {
                dispatch({
                    type: SET_LOGIN_DATA,
                    payload: responseJson.data
                });
                return Promise.resolve(responseJson);
            })
            .catch((error) => {
                return Promise.reject(false);
            });
    };
};

