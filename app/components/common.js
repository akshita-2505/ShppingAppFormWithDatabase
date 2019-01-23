import React, {Component} from 'react';
import {ImageBackground, Image, Text,TouchableOpacity} from 'react-native';
import {Container, Header, Left, Body, Right, Title, Content} from 'native-base';
import {Icon} from "react-native-elements";

export default class Common extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }
    render() {

        return (

            <Header>
                <Left/>
                <Body>
                <Title>Home</Title>
                </Body>
                <Right/>
                <TouchableOpacity>
                <Icon name={'search'} size={25}/>
                </TouchableOpacity>
            </Header>


        );
    }
}