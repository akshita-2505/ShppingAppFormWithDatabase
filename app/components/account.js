import React, {Component} from 'react';
import {TouchableOpacity, StyleSheet, Text, AsyncStorage} from "react-native";
import {Container, Content, View} from 'native-base';
import {Title} from "react-native-paper";
import {deleteUser} from '../actions/userAction';
import {connect} from "react-redux";
import Header from './commonHeader';
import Dialog, { DialogContent } from 'react-native-popup-dialog';

class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async logout(username) {
        try {
            await AsyncStorage.removeItem('user');
            this.props.navigation.navigate('Login')
        }
        catch(error) {
            console.log(error)
        }
    }
    getData = async () => {
        debugger
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

    render() {
        return (
            <Container>
                <Header/>
                <Content>
                    <View>
                        <TouchableOpacity style={styles.container} onPress={()=>{this.props.navigation.navigate('UserRegistration')}}>
                            <Text style={styles.text}>Profile</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.container} onPress={()=>{this.logout()}}>
                            <Text style={styles.text}>Logout</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.container} onPress={()=>{this.getData()}}>
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
