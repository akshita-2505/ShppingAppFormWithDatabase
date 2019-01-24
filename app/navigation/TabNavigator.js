import Homepage from '../components/home'
import Accounts from "../components/account";

import IconI from "react-native-vector-icons/Ionicons";
import IconF from "react-native-vector-icons/FontAwesome";
import React from "react";
import { createAppContainer,createBottomTabNavigator } from 'react-navigation';

const TabNavigator = createBottomTabNavigator({
    Home:{screen:Homepage},
    Account:{screen:Accounts}
    },{
    initialRouteName:'Home',
    defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
            const { routeName } = navigation.state;
            let IconComponent;
            let iconName;
            if (routeName === 'Home') {
                IconComponent= IconI;
                iconName = 'ios-home';
            } else if (routeName === 'Account') {
                IconComponent = IconF;
                iconName = 'user';
            }
// You can return any component that you like here!
            return <IconComponent name={iconName} size={25} color={tintColor} />;
        },
    }),
    tabBarOptions: {
        activeTintColor: '#00004d',
        inactiveTintColor: '#99b9ff',
        style: {
            height: 60,
            paddingVertical: 5,
            backgroundColor: "#8080ff"
        },
        labelStyle: {
            fontSize: 12,
            lineHeight: 20,
// fontFamily: "CircularStd-Book"
        }
    }});

export default createAppContainer(TabNavigator);