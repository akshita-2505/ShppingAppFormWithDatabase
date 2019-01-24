import React, {Component} from 'react';
import {
    AsyncStorage,
    View,
    Text,
    StyleSheet
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import ThemeColor from './themeColor';
import {Header} from "react-native-elements";
import {Container} from "native-base";

export default class Welcome extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(): void {
        this.getData()
    }

    getData = async () => {
        try {
            const username = await AsyncStorage.getItem('user');
            if ((JSON.parse(username).login) !== 'no') {

                if ((JSON.parse(username)).type == 'false') {

                    this.props.navigation.navigate('Tab')
                } else if ((JSON.parse(username)).type == 'true') {

                    this.props.navigation.navigate('AdminTabNavigator')
                }
            } else {
                this.props.navigation.navigate('Login')
            }
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return (
            <ThemeColor>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Animatable.Text animation="zoomIn"
                                     iterationCount={100}
                                     direction="alternate"
                                     style={{fontSize: 50, fontWeight: 'bold', color: '#00134d'}}>
                        Unique</Animatable.Text>
                </View>
            </ThemeColor>
        );
    }
}
    const styles = StyleSheet.create({
        linearGradient: {
            flex: 1,
            paddingLeft: 15,
            paddingRight: 15,
            borderRadius: 5
        },
        buttonText: {
            fontSize: 18,
            fontFamily: 'Gill Sans',
            textAlign: 'center',
            margin: 10,
            color: '#ffffff',
            backgroundColor: 'transparent',
        },
    });


