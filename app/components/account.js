import React, {Component} from 'react';
import {TouchableOpacity, StyleSheet, Text, AsyncStorage,Alert} from "react-native";
import {Container, Content, View} from 'native-base';
import {deleteUser} from '../actions/userAction';
import {connect} from "react-redux";
import Header from './commonHeader';

class Account extends Component {
    constructor(props) {
        super(props);
    }
    async logout() {
            try {
                await AsyncStorage.removeItem('user');
                this.props.navigation.navigate('Login')
            }
            catch(error) {
                console.log(error)
            }
    }
    getData = async () => {
        try {
            const value = await AsyncStorage.getItem('user');
            const email = (JSON.parse(value).login);
            if (email !== 'no') {
                this.props.deleteUser({email})
                this.props.navigation.navigate('Login');
            }
            else{
                this.props.navigation.navigate('Login')
            }
        }catch(error){
            alert("no")
        }
    }

    conformationLogout(){
        Alert.alert(
            'Log out',
            'Are you sure?',
            [
                {text: 'Cancel'},
                {text: 'OK', onPress: () => {this.logout()}},
            ],
            { cancelable: false }
        )
    }
    conformationDeleteAccount(){
        Alert.alert(
            'Delete Account',
            'Are you sure?',
            [
                {text: 'Cancel'},
                {text: 'OK', onPress: () => {this.getData()}},
            ],
            { cancelable: false }
        )
    }
    render() {
        return (
            <Container>
                <Header/>
                <Content>
                    <View>
                        <TouchableOpacity style={styles.container} onPress={()=>{this.props.navigation.navigate('UserRegistration')}}>
                            <Text style={styles.text}>Profile</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.container} onPress={()=>{this.conformationLogout()}}>
                            <Text style={styles.text}>Logout</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.container} onPress={()=>{this.conformationDeleteAccount()}}>
                            <Text style={styles.text}>Delete Account</Text>
                        </TouchableOpacity>

                    </View>
                </Content>
            </Container>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginTop: 3,
        backgroundColor: '#ccddff',
    },
    text: {
        color: '#002066',
        fontWeight:'bold',
        fontSize:15,
        marginLeft:15
    }
});
const mapStateToProps = (state) => {
    const {loading} = state.user;
    return {
        loading
    };
};

export default connect(mapStateToProps, {
    deleteUser
})(Account);
