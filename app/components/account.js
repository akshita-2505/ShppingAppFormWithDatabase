import React, {Component} from 'react';
import {TouchableOpacity, StyleSheet, Text, AsyncStorage} from "react-native";
import {Container, Header, Content, View} from 'native-base';
import {Title} from "react-native-paper";
import {deleteUser} from '../actions/userAction';
import {connect} from "react-redux";

class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async logout(username) {
        try {
            await AsyncStorage.removeItem('username');
            this.props.navigation.navigate('Login')
        }
        catch(error) {
            console.log(error)
        }
    }
    // getData = async () => {
    //     try {
    //         const value = await AsyncStorage.getItem('username');
    //         if (value !== null) {
    //             this.props.deleteUser({value})
    //         }
    //         else{
    //             this.props.navigation.navigate('Login')
    //         }
    //     }catch(error){
    //         console.log(error)
    //     }
    // }

    render() {
        return (
            <Container>
                <Header>
                    <Title>Account</Title>
                </Header>
                <Content>
                    <View>
                        <TouchableOpacity style={styles.container} onPress={()=>{this.props.navigation.navigate('UserRegistration')}}>
                            <Text style={styles.text}>Profile</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.container} onPress={()=>{this.logout()}}>
                            <Text style={styles.text}>Logout</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.container} onPress={()=>{}}>
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
        backgroundColor: '#EEEEEE',
    },
    text: {
        color: 'black',
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
