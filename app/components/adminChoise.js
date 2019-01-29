import React, {Component} from 'react';
import {ScrollView, Text, TouchableOpacity,StyleSheet} from 'react-native';
import {View, Left, Right, Button, Container, Item, Input} from 'native-base';
import Header from '../components/commonHeader';
import * as Animatable from 'react-native-animatable';

export default class AdminChoise extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <Header/>

                    <Animatable.View animation="zoomIn" style={{flex:1,justifyContent: 'center', marginLeft: 25, marginRight: 25, top: 30,alignItems: 'center'}}>

                            <View style={[styles.container,{height:40,width:200 }]}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('AddProduct')}>
                                    <Text style={styles.text}>Add Product</Text>
                                </TouchableOpacity>
                            </View>
                        <View style={[styles.container,{marginTop: 20,height:40,width:200 }]}>
                            <TouchableOpacity onPress={() => {this.props.navigation.navigate('ShowAdminProduct')}}>
                                <Text style={styles.text}>Show Product</Text>
                            </TouchableOpacity>
                        </View>
                    </Animatable.View>

            </Container>
        );
    }

}
const styles =StyleSheet.create({
    text:{
        color: '#002066',
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor: '#ccddff'
    },
    container:{
        alignItems: 'center',
        borderRadius: 5, width: "100%", backgroundColor: '#ccddff', justifyContent: 'center'
    }
})

