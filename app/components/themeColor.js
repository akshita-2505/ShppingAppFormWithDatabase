import React, {Component} from 'react';
import {
    StyleSheet
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default class ThemeColor extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <LinearGradient colors={['#99b3ff', '#4d79ff', '#99b3ff']} style={styles.linearGradient}>

            </LinearGradient>
        );
    }
}
const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
    }
});


