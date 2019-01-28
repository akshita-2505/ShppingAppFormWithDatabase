import Homepage from '../components/home'
import Accounts from "../components/account";
import AdminChoise from '../components/adminChoise';
import IconI from "react-native-vector-icons/Ionicons";
import IconF from "react-native-vector-icons/FontAwesome";
import React from "react";
import { createAppContainer,createBottomTabNavigator } from 'react-navigation';

const AdminTabNavigator = createBottomTabNavigator({
    Home:{screen:Homepage},
    Product:{screen:AdminChoise},
    Account:{screen:Accounts}
},{
    initialRouteName:'Home',
    header: null,
    headerMode: 'none',
    defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
            const { routeName } = navigation.state;
            let IconComponent;
            let iconName;
            if (routeName === 'Home') {
                IconComponent= IconI;
                iconName = 'ios-home';
            }else if (routeName === 'Product') {
                IconComponent = IconF;
                iconName = 'plus-square-o';
            } else if (routeName === 'Account') {
                IconComponent = IconF;
                iconName = 'user';
            }
// You can return any component that you like here!
            return <IconComponent name={iconName} size={25} color={tintColor} />;
        },
    }),
    tabBarOptions: {
        activeTintColor: '#3F43A6',
        inactiveTintColor: 'gray',
        style: {
            height: 60,
            paddingVertical: 5,
            backgroundColor: "white"
        },
        labelStyle: {
            fontSize: 12,
            lineHeight: 20,
// fontFamily: "CircularStd-Book"
        }
    }});

export default createAppContainer(AdminTabNavigator);