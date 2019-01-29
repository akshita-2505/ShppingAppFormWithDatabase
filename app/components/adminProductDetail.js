import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    TouchableOpacity,
    Text,
    Image
} from 'react-native';
import {connect} from 'react-redux';
import {Body, Container, Left, Right,Header} from "native-base";
import Constants from "../helper/themeHelper";
import IconS from 'react-native-vector-icons/SimpleLineIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

class AdminProductDetail extends Component<Props> {
    constructor(props) {
        super(props);
    }

    render() {
        debugger
        const productData = this.props.navigation.getParam('detail', 'no');
        const uri = productData.image.split("/");
        let imageUri = 'http://localhost:3000/' + uri[uri.length - 1].toString();
        return (
            <Container>
                <Header style={{backgroundColor:'#8080ff'}}>
                    <TouchableOpacity
                        style={{marginTop: Constants.screenHeight * 0.01}}
                        onPress={() => {this.props.navigation.navigate('AdminTabNavigator')
                        }}>
                        <IconS name={'arrow-left'} size={20} color={'white'}/>
                    </TouchableOpacity>
                    <Left/>
                    <Body>
                    <Text style={{fontSize:20,fontWeight:'bold',color:'white',marginLeft: 30,top:-5}}>Unique</Text>
                    </Body>
                    <Right/>

                    <TouchableOpacity
                        style={{marginTop: Constants.screenHeight * 0.01}}
                        onPress={() => {
                        }}>
                        <Icon name={'cart-outline'} size={30} color={'white'}/>
                    </TouchableOpacity>

                </Header>
                <ScrollView style={{flex: 1}}>
                    <View style={{alignItems: 'center'}}>
                        <Image source={{uri: imageUri}} style={{height: 300, width: '100%', marginTop: 40}}/>
                    </View>
                    <Text style={{
                        fontSize: 23,
                        fontWeight: 'bold',
                        marginLeft: 10,
                        marginTop: 50
                    }}>${productData.price}</Text>
                    <Text style={{marginLeft: 10, fontSize: 20, marginTop: 10}}>{productData.name}</Text>
                    <Text style={{marginLeft: 10, fontSize: 19, marginTop: 10}}>{productData.detail}</Text>

                    <TouchableOpacity style={{alignItems: 'center'}} onPress={()=>{this.props.navigation.navigate('UpdateProduct',{data:productData})}}>
                        <Text style={{
                            fontSize: 22, marginTop: 25, marginBottom: 20,
                            color: '#002066',
                            fontWeight: 'bold',
                        }}>Update Details</Text>
                    </TouchableOpacity>
                </ScrollView>
            </Container>
        );
    }
}

const styles = StyleSheet.create({});

const mapStateToProps = (state) => {
    const {loading} = state.product;
    return {
        loading
    };
};

export default connect(mapStateToProps, {

})(AdminProductDetail);
