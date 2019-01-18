import React, { Component } from 'react';
import {StyleSheet,
    View,
    TextInput,
    Button,
    Text,
    ActivityIndicator,
    Image,
    ImageBackground,
    SafeAreaView} from 'react-native';
import {connect} from 'react-redux';
import {updateUser, userRegistration ,getUser} from "../actions/userAction";
import { NavigationActions, StackActions } from 'react-navigation';
import * as Animatable from 'react-native-animatable';
// import ICON from ''
import RadioForm from 'react-native-simple-radio-button';


var radio_props = [
    {label: 'Male', value: 0 },
    {label: 'Female', value: 1 }
];
class Registration extends Component<Props> {
    static navigationOptions = {
        title: 'Registration',
        visibility:true

    };

    constructor(props) {
        super(props);
        this.state = {
            data:this.props.navigation.getParam("item","NO_ID"),
            firstName: '',
            lastName: '',
            gender:'',
            age: '',
            phone_number:'',
            email: '',
            password:'',
        }
    }
    componentDidMount(){
        this.setState({firstName:this.state.data.firstName})
        this.setState({lastName:this.state.data.lastName})
        this.setState({gender:this.state.data.gender})
    }

// ,age,phone_number,email,password
//     age: parseInt(age),phone_number,email,password
    register = () =>{

        const {phone_number,email} = this.state;
        this.props.userRegistration({phone_number,email}).then(res=>{

            const {navigation} = this.props;
            navigation.dispatch(StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Users' })],
            }));
        }).catch(err=>{
            alert("Registration failed")
        })
    };

    updateData=(id)=>{
        const {phone_number,email} = this.state;
        this.props.updateUser({id,phone_number,email}).then(res=>{
            const {navigation} = this.props;
            navigation.dispatch(StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Users' })],
            }));
        }).catch(err=>{
            alert("update failed")
        })
    }
    // firstNameValidation=()=>{
    //     const reg = /^[a-zA-Z\s]+$/;
    //     if (reg.test(this.state.firstName) === true) {
    //         if (reg.test(this.state.lastName) === true) {
    //             alert("done")
    //         }
    //     }
    //     else{ alert("Not")}
    // }
    // ageValidation=()=>{
    //     if(isNaN(this.state.age))
    //     {
    //         alert("Value is Not Number");
    //     }
    //     else
    //     {
    //         alert("Value is Number");
    //     }
    // }
    // phoneValidation=()=>{
    //     const reg = '/^[0-9]{10}+$/';
    //     if (reg.test(this.state.phone_number) === true) {
    //         this.emailValidation()
    //     }
    // }
    // emailValidation= () =>
    // {
    //     const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    //     if (reg.test(this.state.email) === true) {
    //         this.checkPass()
    //     }else{}
    // }
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
        const { navigation } = this.props;

        return (
            <ImageBackground source={require('../image/bg.jpg')} style={{width: '100%', height: '100%'}}>
            <Animatable.View animation="lightSpeedIn" style={styles.MainContainer}>

                <Text style= {styles.title}>User Registration Form</Text>

                {/*<TextInput*/}
                    {/*placeholder={"FirstName"}*/}
                    {/*onChangeText={firstName => this.setState({firstName})}*/}
                    {/*underlineColorAndroid='transparent'*/}
                    {/*style={styles.TextInputStyleClass}*/}
                    {/*value={this.state.firstName}*/}
                {/*/>*/}

                {/*<TextInput*/}
                    {/*placeholder="LastName"*/}
                    {/*onChangeText={lastName => this.setState({lastName})}*/}
                    {/*underlineColorAndroid='transparent'*/}
                    {/*style={styles.TextInputStyleClass}*/}
                    {/*value={this.state.lastName}*/}
                {/*/>*/}

                {/*<View>*/}
                    {/*<Text style={{color:'#009688',fontSize:17}}>Gender:</Text>*/}
                    {/*<RadioForm*/}
                        {/*radio_props={radio_props}*/}
                        {/*initial={0}*/}
                        {/*onPress={(gender) => {this.setState({gender})}}*/}
                        {/*value={this.state.gender}*/}
                    {/*/>*/}
                {/*</View>*/}

                {/*<TextInput*/}
                    {/*placeholder="age"*/}
                    {/*keyboardType="numeric"*/}
                    {/*onChangeText={email => this.setState({email})}*/}
                    {/*underlineColorAndroid='transparent'*/}
                    {/*style={styles.TextInputStyleClass}*/}
                {/*/>*/}
                {/*<Icon name="rocket" size={30} color="#900" />*/}
                <TextInput
                    placeholder="phoneNo"
                    onChangeText={phone_number => this.setState({phone_number})}
                    placeholderTextColor="white"
                    underlineColorAndroid='transparent'
                    style={styles.TextInputStyleClass}
                />
                <TextInput
                    placeholder="Enter email"
                    placeholderTextColor="white"
                    onChangeText={email => this.setState({email})}
                    underlineColorAndroid='transparent'
                    style={styles.TextInputStyleClass}
                />
                {/*<TextInput*/}
                    {/*placeholder="Enter password"*/}
                    {/*onChangeText={age => this.setState({age})}*/}
                    {/*underlineColorAndroid='transparent'*/}
                    {/*style={styles.TextInputStyleClass}*/}
                {/*/>*/}
                {/*<TextInput*/}
                    {/*placeholder="confirm password"*/}
                    {/*onChangeText={age => this.setState({age})}*/}
                    {/*underlineColorAndroid='transparent'*/}
                    {/*style={styles.TextInputStyleClass}*/}
                {/*/>*/}


                <Button title="Submit"
                        onPress={()=> {
                            debugger
                            if (this.state.data.id == undefined)
                            {
                                this.register()
                            } else {
                                this.updateData(this.state.data.id)
                            }
                        }}
                        disabled={loading}
                        color="#2196F3" />

                {
                    loading &&
                    <View style={{top:0, left:0, bottom:0, right:0}}>
                        <ActivityIndicator animating={true}/>
                    </View>
                }

            </Animatable.View>
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
    userRegistration,
    updateUser,
    getUser
})(Registration);
