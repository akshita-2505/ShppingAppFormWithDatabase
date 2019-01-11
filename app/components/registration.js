import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Button, Text, ActivityIndicator } from 'react-native';
import {connect} from 'react-redux';
import { userRegistration } from "../actions/userAction";
import { NavigationActions, StackActions } from 'react-navigation';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

var radio_props = [
    {label: 'Male', value: 0 },
    {label: 'Female', value: 1 }
];

class Registration extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            gender:'',
            age: '',
            phone_number:'',
            email: '',
            password:''
        }
    }

    register = () =>{
        const {firstName, lastName,gender,age,phone_number,email,password} = this.state;
        this.props.userRegistration({firstName, lastName,gender,
            age: parseInt(age),phone_number,email,password}).then(res=>{
            const {navigation} = this.props;
            navigation.dispatch(StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Users' })],
            }));

        }).catch(err=>{
            alert("Registration failed")
        })
    };

    phoneValidation=()=>{
        const reg = /^[0-9]{10}$/;
        if (reg.test(this.state.phone_number) === true) {
            this.emailValidation()
        }
    }
    emailValidation= () =>
    {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(this.state.email) === true) {
            this.checkPass()
        }else{}
    }
    // passValidation=()=>{
    //     debugger
    //     const reg = /^.*(?=.{8,})(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).*$/;
    //     if (reg.test(this.state.password) === true) {
    //         this.checkPass()
    //     }
    // }
    //
    // checkPass=()=>{
    //     if(this.state.password === this.state.cpass){
    //         this.register()
    //     }
    // }

    render() {
        const { loading } = this.props;
        return (
            <View style={styles.MainContainer}>

                <Text style= {styles.title}>User Registration Form</Text>

                <TextInput
                    placeholder="Enter FirstName"
                    onChangeText={firstName => this.setState({firstName})}
                    underlineColorAndroid='transparent'
                    style={styles.TextInputStyleClass}
                />

                <TextInput
                    placeholder="Enter LastName"
                    onChangeText={lastName => this.setState({lastName})}
                    underlineColorAndroid='transparent'
                    style={styles.TextInputStyleClass}
                />

                <View>
                    <Text>Gender:</Text>
                    <RadioForm
                        radio_props={radio_props}
                        initial={0}
                        onPress={(gender) => {this.setState({gender})}}
                    />
                </View>

                <TextInput
                    placeholder="age"
                    onChangeText={email => this.setState({email})}
                    underlineColorAndroid='transparent'
                    style={styles.TextInputStyleClass}
                />

                <TextInput
                    placeholder="phoneNo"
                    onChangeText={age => this.setState({age})}
                    underlineColorAndroid='transparent'
                    style={styles.TextInputStyleClass}
                />
                <TextInput
                    placeholder="Enter email"
                    onChangeText={age => this.setState({age})}
                    underlineColorAndroid='transparent'
                    style={styles.TextInputStyleClass}
                />
                <TextInput
                    placeholder="Enter password"
                    onChangeText={age => this.setState({age})}
                    underlineColorAndroid='transparent'
                    style={styles.TextInputStyleClass}
                />
                <TextInput
                    placeholder="confirm password"
                    onChangeText={age => this.setState({age})}
                    underlineColorAndroid='transparent'
                    style={styles.TextInputStyleClass}
                />

                <Button title="Click Here To Register"
                        onPress={this.phoneValidation}
                        disabled={loading}
                        color="#2196F3" />
                {
                    loading &&
                    <View style={{top:0, left:0, bottom:0, right:0}}>
                        <ActivityIndicator animating={true}/>
                    </View>
                }
            </View>
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
        height: 40,
        borderWidth: 1,
        borderColor: '#2196F3',
        borderRadius: 5 ,
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
    userRegistration
})(Registration);
