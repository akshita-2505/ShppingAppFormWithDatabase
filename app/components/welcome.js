import React, {Component} from 'react';
import {
    AsyncStorage,
    View,
    Text
} from 'react-native';

export default class Welcome extends Component{
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        this.getData()
    }

    getData = async () => {
        try {
            const value = await AsyncStorage.getItem('username');
            if (value !== null) {
                this.props.navigation.navigate('Tab')
            }else{
                this.props.navigation.navigate('Login')
            }
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return (

                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingLeft: 50,
                    paddingRight: 50
                }}>
                    <Text>Unique</Text>
                </View>
        );
    }
}

