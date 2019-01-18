import React, { Component } from 'react';
import {ScrollView, Text, TouchableOpacity, Switch, ImageBackground} from 'react-native';
import { View, Left, Right, Button, Icon, Item, Input} from 'native-base';
import * as Animatable from 'react-native-animatable';
import IconM from 'react-native-vector-icons/MaterialIcons';
import {NavigationActions, StackActions} from "react-navigation";
import {connect} from "react-redux";
import {userRegistration} from "../actions/userAction";




class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            firstName: '',
            password: '',
            coPassword: '',
            hasError: false,
            errorText: '',
            type: false,

        };
    }
    register = () =>{
        //validation here...
        if(!this.signup()) {

            const {firstName, email, password, type} = this.state;

            this.props.userRegistration({firstName, email, password, type}).then(res => {
                const {navigation} = this.props;
                navigation.dispatch(StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({routeName: 'Users'})],
                }));
            }).catch(err => {
                alert("Registration failed")
            })
        }
    };

    render() {
        return(
            <ImageBackground source={require('../image/bg.jpg')} style={{width: '100%', height: '100%'}}>

                <ScrollView contentContainerStyle={{flexGrow: 1}}>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingLeft: 50, paddingRight: 50}}>

                        <Animatable.View animation="" iterationCount={100} direction="alternate">
                            <IconM active name='shopping-basket' style={{color: '#008B8B'}} size={120}/>
                        </Animatable.View>


                        <View style={{marginBottom: 35,alignItems:"center", width: '100%'}}>
                            <Text style={{fontSize: 24, fontWeight: 'bold', textAlign: 'center', width: '100%', color: "#FFA500"}}>Create your account </Text>

                        </View>

                        <Item>
                            <Icon active name='ios-man' style={{color: '#6B8E23'}} />
                            <Input placeholder='Name' onChangeText={(firstName) => this.setState({firstName})} placeholderTextColor="#6B8E23" style={{color:'#6B8E23'}}/>
                        </Item>

                        <Item>
                            <Icon active name='ios-mail' style={{color: '#6B8E23'}} />
                            <Input placeholder='Email' onChangeText={(email) => this.setState({email})} keyboardType="email-address" placeholderTextColor="#6B8E23" style={{color:'#6B8E23'}}/>
                        </Item>

                        <Item>
                            <Icon active name='ios-lock' style={{color: '#6B8E23'}} />
                            <Input placeholder='Password' onChangeText={(password) => this.setState({password})} secureTextEntry={true} placeholderTextColor="#6B8E23" style={{color:'#6B8E23'}}/>
                        </Item>
                        <Item>
                            <Icon active name='ios-lock' style={{color: '#6B8E23'}} />
                            <Input placeholder='Confirm password' onChangeText={(coPassword) => this.setState({coPassword})} secureTextEntry={true} placeholderTextColor="#6B8E23" style={{color:'#6B8E23'}}/>
                        </Item>

                        <Item>
                            <Icon active name='ios-person' style={{color: '#6B8E23'}} />
                            <Input placeholder='Admin' disabled={true} secureTextEntry={true} placeholderTextColor="#6B8E23" />
                            <Switch
                                onValueChange = {(type) => this.setState({type})}
                                value = {this.state.type}/>

                        </Item>

                        {this.state.hasError?<Text style={{color: "#c0392b", textAlign: 'center', marginTop: 10}}>{this.state.errorText}</Text>:null}
                        <View style={{alignItems: 'center',width:"100%",justifyContent:"center"}}>
                            <TouchableOpacity onPress={() => this.register()} style={{backgroundColor: "transprant", marginTop: 20,width:"100%",height:30,textAlign: 'center'}}>
                                <Text style={{color: '#D2691E',textAlign: 'center',paddingTop: 5,fontSize:20}}>Signup</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </ImageBackground>
        );
    }

    signup() {
        if(this.state.email===""||this.state.name===""||this.state.password===""||this.state.rePassword==="") {
            this.setState({hasError: true, errorText: 'Please fill all fields !'});
            return true;
        }
        if(!this.emailValidation(this.state.email)) {
            this.setState({hasError: true, errorText: 'Please enter a valid email address !'});
            return true;
        }

        if(this.state.password.length < 6) {
            this.setState({hasError: true, errorText: 'Passwords must contains at least 6 characters !'});
            return true;
        }
        if(this.state.password !== this.state.coPassword) {
            this.setState({hasError: true, errorText: 'Passwords does not match !'});
            return true;
        }
        return false;
        this.setState({hasError: false});
        //  Actions.home();
    }

    emailValidation(email) {
        var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return reg.test(email);
    }
}

const mapStateToProps = (state) => {
    const {loading} = state.user;
    return {
        loading
    };
};

export default connect(mapStateToProps,{
    userRegistration
})(Signup);
