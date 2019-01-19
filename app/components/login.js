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
import {NavigationActions, StackActions} from "react-navigation";

class Login extends Component<Props> {
    // static navigationOptions = {
    //     title: 'Login',
    // };

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password:'',
        }
    }

    checkPass = (email,password)=>{
        if(this.state.email===""||this.state.password==="") {
            this.setState({hasError: true, errorText: 'Please fill all fields !'});
            return true;
        }
        this.props.userLogin({ email, password}).then(result => {

            if(result) {
                if (JSON.stringify(result.type)) {
                    const {navigation} = this.props;
                    navigation.dispatch(StackActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({routeName: 'Profile'})],
                    }));
                }
            }

        }).catch(err => {
            alert("Email and Password Wrong");
        })

    }

    render() {
        return (
            <ImageBackground source={require('../image/bg.jpg')} style={{width: '100%', height: '100%'}}>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingLeft: 50, paddingRight: 50}}>
                        <View style={{marginBottom: 40, width: '100%',alignItems:"center",justifyContent:"center"}}>
                            <Text style={{fontSize: 28, fontWeight: 'bold', textAlign: 'center', width: '100%', color: "#FFA500"}}>Welcome </Text>
                        </View>
                        <Item>
                            <Icon active name='ios-person' style={{color: "#6B8E23"}}  />
                            <Input placeholder='Username' onChangeText={(email) => this.setState({email})} placeholderTextColor="#6B8E23" style={{color:"#6B8E23"}} />
                        </Item>
                        <Item>
                            <Icon active name='ios-lock' style={{color: "#6B8E23"}} />
                            <Input placeholder='Password' onChangeText={(password) => this.setState({password})} secureTextEntry={true} placeholderTextColor="#6B8E23" style={{color:"#6B8E23"}} />
                        </Item>
                        {this.state.hasError?<Text style={{color: "#c0392b", textAlign: 'center', marginTop: 10}}>{this.state.errorText}</Text>:null}
                        <View style={{alignItems: 'center',width:"100%",justifyContent:"center"}}>
                            <TouchableOpacity onPress={() => this.checkPass(this.state.email,this.state.password)} style={{marginTop: 20,width:"100%",height:30,textAlign: 'center'}}>
                                <Text style={{color: '#D2691E',paddingTop: 5,fontSize: 20, fontWeight: 'bold', textAlign: 'center',}}>Login</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Signup')} style={{backgroundColor: "transprant", marginTop: 20,width:"100%",height:30}}>
                                <Text style={{color: '#fdfdfd',textAlign: 'center',paddingTop: 5}}>Don't have account?</Text>
                            </TouchableOpacity>

                            {/*<Image source={this.state.avatarSource} style={{width:'100%',height:300,margin:10,backgroundColor:"black"}}/>*/}

                        </View>
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
})(Login);
