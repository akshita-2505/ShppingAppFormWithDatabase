import React, {Component} from 'react';
import {ImageBackground, Image, Text} from 'react-native';
import {Container, Header, Left, Body, Right, Title, Content} from 'native-base';
import {Icon} from "react-native-elements";

export default class Common extends Component {
    render() {
        return (

            <Header>
                <Icon name={'menu'} size={25}/>
                <Left/>
                <Body>
                <Title>Home</Title>

                </Body>
                <Right/>
                <Icon name={'search'} size={25}/>
            </Header>


        );
    }
}