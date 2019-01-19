import React, { Component } from 'react';
import {StyleSheet,
    TextInput,
    Text,
    ActivityIndicator,
    Image,
    TouchableOpacity,
    ImageBackground,
    SafeAreaView} from 'react-native';
import {connect} from 'react-redux';
import {deleteUser, getUser, userLogin} from "../actions/userAction";
import { Container, Left,View, Right, Button, Icon, Item, Input } from 'native-base';


class ProductDetail extends Component<Props> {
        constructor(props) {
        super(props);

    }

    render() {
        return (
            <ImageBackground source={require('../image/bg.jpg')} style={{width: '100%', height: '100%'}}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingLeft: 50, paddingRight: 50}}>

                </View>
            </ImageBackground>
        );
    }
}
const styles = StyleSheet.create({

    MainContainer :{
        justifyContent: 'center',
        flex:1,
        margin: 10
    },

    TextInputStyleClass: {
        textAlign: 'center',
        marginBottom: 7,
        height: 45,
        borderWidth: 1,
        borderColor: '#2196F3',
        borderRadius: 25 ,
        color: "white"
    },

    title:{
        fontSize: 22,
        color: "#009688",
        textAlign: 'center',
        marginBottom: 15
    }
});

const mapStateToProps = (state) => {
    const {loading} = state.user;
    return {
        loading
    };
};

export default connect(mapStateToProps,{
    getUser,
    userLogin
})(ProductDetail);
