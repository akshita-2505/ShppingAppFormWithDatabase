import React, {Component} from 'react';
import {TouchableOpacity,Text} from 'react-native';
import {Container, Header, Left, Body, Right, Title, Content} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Constants from '../helper/themeHelper'

export default class CommonHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <Header style={{backgroundColor:'#8080ff'}}>
                {/*<Text style={{fontSize:20,fontWeight:'bold',color:'white',marginLeft: 30,top:10}}>Unique</Text>*/}
                {/*<TouchableOpacity onPress={() => {*/}
                {/*}}>*/}
                {/*<Icon name={'cart-outline'} size={30} color={'white'} style={{top:10,paddingRight: 10}}/>*/}
                {/*</TouchableOpacity>*/}
                <Left/>
                <Body>
                <Text style={{fontSize:20,fontWeight:'bold',color:'white',marginLeft: 30,top:-5}}>Unique</Text>
                {/*<Title>Home</Title>*/}
                </Body>
                <Right/>

                <TouchableOpacity
                    style={{marginTop: Constants.screenHeight * 0.01}}
                    onPress={() => {
                }}>
                    <Icon name={'cart-outline'} size={30} color={'white'}/>
                </TouchableOpacity>

            </Header>


        );
    }
}