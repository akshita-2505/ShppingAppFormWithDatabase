import {
    REMOVE_CONTACT,
    SET_ADDTOCART_LIST,
    SET_LOADER,
} from "./types";
import ApiConstant from '../helper/apiConstant';

export const getitem = () => {
    return (dispatch, getState) => {
        return fetch(ApiConstant.baseUrl+ApiConstant.addtocart)
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch({
                    type: SET_ADDTOCART_LIST,
                    payload: responseJson.data
                });
                return Promise.resolve(responseJson.data);
            })
            .catch((error) => {
                alert(error);
            });
    };
};
export const getItemByEmail = (email) => {
    return (dispatch, getState) => {
        dispatch({type: SET_LOADER,payload: true});
        return fetch(ApiConstant.baseUrl+ApiConstant.addtocart+ (email))
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch({type: SET_LOADER,payload: false});
                dispatch({
                    type: SET_ADDTOCART_LIST,
                    payload: responseJson.data
                });
                return Promise.resolve(true);
            })
            .catch((error) => {
                alert(error);
            });
    };
};
export const deleteItem = (userData) => {
    return (dispatch, getState) => {
        dispatch({type: REMOVE_CONTACT,
            payload: true});
        return fetch(ApiConstant.baseUrl+ApiConstant.addtocart + (userData) ,
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
// export const getProductById = (userData) => {
//     return (dispatch, getState) => {
//         dispatch({type: SET_LOADER,payload: true});
//         return fetch(ApiConstant.baseUrl+ApiConstant.product + (userData))
//             .then((response) => response.json())
//             .then((responseJson) => {
//                 dispatch({type: SET_LOADER,payload: false});
//                 dispatch({
//                     type: SET_PRODUCT_DATA,
//                     payload: responseJson.data
//                 });
//                 return Promise.resolve(true);
//             })
//             .catch((error) => {
//                 alert(error);
//             });
//     };
// };
export const itemAdd = (productData) => {
    return (dispatch, getState) => {
        dispatch({type: SET_LOADER,payload: true});
        return fetch(ApiConstant.baseUrl+ApiConstant.addtocart,
            {
                method : 'POST',
                headers : {
                    'Accept': 'application/json',
                    'Content-Type' : 'multipart/form-data',
                },
                body:productData
            }).then((response) => response.json())
            .then((responseJson) => {
                dispatch({type: SET_LOADER,payload: false});
                dispatch({
                    type: SET_ADDTOCART_LIST,
                    payload: responseJson.result
                });
                return Promise.resolve(responseJson);
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



// export const productdelete = (id) => {
//     return (dispatch, getState) => {
//         dispatch({type: SET_LOADER,payload: true});
//
//         debugger;
//         return fetch(ApiConstant.baseUrl+ApiConstant.product+(id),
//             {
//                 method : 'DELETE',
//                 headers : {
//                     'Accept': 'application/json',
//                     'Content-Type': 'application/json'
//                 }
//             }).then((response) => response.json())
//             .then((responseJson) => {
//
//                 dispatch({
//                     type: PRODUCT_SIGNIN,
//                     payload: responseJson.result
//                 });
//                 return Promise.resolve(responseJson);
//             }).catch((error) => {
//                 return Promise.reject(error);
//             });
//     };
// };
// export const productUpdate = (productData,id) => {
//     debugger
//     return (dispatch, getState) => {
//         dispatch({type: SET_LOADER,payload: true});
//         return fetch(ApiConstant.baseUrl+ApiConstant.product+ApiConstant.update+(id),
//             {
//                 method : 'PATCH',
//                 headers : {
//                     'Accept': 'application/json',
//                     'Content-Type' : 'multipart/form-data',
//                 },
//                 body:productData
//             }).then((response) => response.json())
//             .then((responseJson) => {
//                 dispatch({type: SET_LOADER,payload: false});
//                 dispatch({
//                     type: SET_PRODUCT_DATA,
//                     payload: responseJson.result
//                 });
//                 return Promise.resolve(responseJson);
//             })
//             .catch((error) => {
//                 dispatch({
//                     type: SET_LOADER,
//                     payload: false
//                 });
//                 return Promise.reject(error);
//             });
//     };
// };


