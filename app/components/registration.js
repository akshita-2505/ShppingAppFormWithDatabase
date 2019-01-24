import React, { Component } from 'react';
import {ScrollView, Text, TouchableOpacity, Switch, ImageBackground, AsyncStorage} from 'react-native';
import { View, Left, Right, Button, Icon, Item, Input} from 'native-base';
import * as Animatable from 'react-native-animatable';
import IconM from 'react-native-vector-icons/MaterialIcons';
import {NavigationActions, StackActions} from "react-navigation";
import {connect} from "react-redux";
import {updateUser,userRegistration} from "../actions/userAction";

class Registration extends Component {
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
    register = async () => {
        try {
            // const username = await AsyncStorage.getItem('user');
            // alert(username)
            // if ((JSON.parse(username).login) !== 'no') {
            //     if(!this.validation()) {
            //         const {firstName, email, password, type} = this.state;
            //         const {navigation} = this.props;
            //         this.props.updateUser({firstName, email, password, type}).then(result => {
            //             alert("successfully updated")
            //         }).catch(err => {
            //             alert("not updated")
            //         })
            //     }
            // }else{
                if(!this.validation()) {
                    const {firstName, email, password, type} = this.state;
                    const {navigation} = this.props;
                    this.props.userRegistration({firstName, email, password, type}).then(result => {
                        if (result) {
                            if(result.type==true){
                                this.props.navigation.dispatch(StackActions.reset({
                                    index: 0,
                                    actions: [NavigationActions.navigate({ routeName: 'AdminTabNavigator', params: { username: email,type: 'true'} })],
                                }));
                            }else if(result.type==false){
                                this.props.navigation.dispatch(StackActions.reset({
                                    index: 0,
                                    actions: [NavigationActions.navigate({ routeName: 'Tab', params: { username: email,type: 'true'} })],
                                }));
                            }else{

                            }
                        }

                    }).catch(err => {
                        alert("Registration failed")
                    })


                }
        //     }
        }catch{

        }
    }

    render() {
        return(


            <ScrollView contentContainerStyle={{flexGrow: 1}}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingLeft: 50, paddingRight: 50}}>

                    <Animatable.View animation="" iterationCount={100} direction="alternate">
                        <IconM active name='shopping-basket' style={{color: '#008B8B'}} size={120}/>
                    </Animatable.View>


                    <View style={{marginBottom: 35,alignItems:"center", width: '100%'}}>
                        <Text style={{fontSize: 24, fontWeight: 'bold', textAlign: 'center', width: '100%', color: "#00134d"}}>Registration</Text>

                    </View>

                    <Item>
                        <Icon active name='ios-man' style={{color: '#003399'}} />
                        <Input placeholder='Name' onChangeText={(firstName) => this.setState({firstName})} placeholderTextColor="#003399" style={{color:'#003399'}}/>
                    </Item>

                    <Item>
                        <Icon active name='ios-mail' style={{color: '#003399'}} />
                        <Input placeholder='Email' onChangeText={(email) => this.setState({email})} keyboardType="email-address" placeholderTextColor="#003399" style={{color:'#003399'}}/>
                    </Item>

                    <Item>
                        <Icon active name='ios-lock' style={{color: '#003399'}} />
                        <Input placeholder='Password' onChangeText={(password) => this.setState({password})} secureTextEntry={true} placeholderTextColor="#003399" style={{color:'#003399'}}/>
                    </Item>
                    <Item>
                        <Icon active name='ios-lock' style={{color: '#003399'}} />
                        <Input placeholder='Confirm password' onChangeText={(coPassword) => this.setState({coPassword})} secureTextEntry={true} placeholderTextColor="#003399" style={{color:'#003399'}}/>
                    </Item>

                    <Item>
                        <Icon active name='ios-person' style={{color: '#003399'}} />
                        <Input placeholder='Admin' disabled={true} secureTextEntry={true} placeholderTextColor="#003399" />
                        <Switch
                            onValueChange = {(type) => this.setState({type})}
                            value = {this.state.type}/>

                    </Item>

                    {this.state.hasError?<Text style={{color: "#c0392b", textAlign: 'center', marginTop: 10}}>{this.state.errorText}</Text>:null}
                    <View style={{alignItems: 'center',width:"100%",justifyContent:"center"}}>
                        <TouchableOpacity onPress={() => this.register()} style={{backgroundColor: "transprant", marginTop: 20,width:"100%",height:30,textAlign: 'center'}}>
                            <Text style={{color: '#D2691E',textAlign: 'center',paddingTop: 5,fontSize:20}}>Signup</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} style={{backgroundColor: "transprant", marginTop: 20,width:"100%",height:30}}>
                            <Text style={{color: 'black',textAlign: 'center',paddingTop: 5}}>Already have account?</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        );
    }

    validation() {
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
    updateUser,
    userRegistration
})(Registration);
