import React, {Component} from 'react';
import {TouchableOpacity,Text} from 'react-native';
import {Container, Header, Left, Body, Right, Title, Content} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default class CommonHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <Header style={{backgroundColor:'#8080ff'}}>
                <Left/>
                <Body>
                <Text style={{fontSize:20,fontWeight:'bold',color:'#002066'}}>Unique</Text>
                {/*<Title>Home</Title>*/}
                </Body>
                <Right/>
                <TouchableOpacity onPress={() => {
                }}>
                    <Icon name={'cart-outline'} size={30}/>
                </TouchableOpacity>
            </Header>


        );
    }
}