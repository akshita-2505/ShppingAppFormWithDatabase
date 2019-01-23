import {  createAppContainer ,createDrawerNavigator} from 'react-navigation';
import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import Signup from "../components/signup";
import UserRegistration from "../components/registration";

const AppNavigator = createDrawerNavigator({
    Signup,
    UserRegistration,
});


const NavigationDrawer = createAppContainer(AppNavigator);

export default NavigationDrawer;