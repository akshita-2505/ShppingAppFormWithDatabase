import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import AppReducer from './app/reducers/index.js';
import AppNavigator from './app/navigation/AppNavigation';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
};
const persistedReducer = persistReducer(persistConfig, AppReducer);
let store1 = createStore(persistedReducer,applyMiddleware(thunk));
let persistor = persistStore(store1);

export default class App extends React.Component {

    render() {
        return (
            <Provider store={store1}>
                <AppNavigator/>
            </Provider>
        );
    }
}