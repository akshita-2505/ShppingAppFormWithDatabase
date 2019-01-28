import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    TouchableOpacity,
    Text,
    Image,
    SafeAreaView
} from 'react-native';
import {connect} from 'react-redux';
import {Body, Container, Left, Right} from "native-base";
import Header from './commonHeader';
import Icon from "react-native-vector-icons/Entypo";
import {Title} from "react-native-paper";

class ProductDetail extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const {navigation} = this.props;
        const productData = navigation.getParam('detail', 'no');
        const uri = productData.image.split("/");
        let imageUri = 'http://localhost:3000/' + uri[uri.length - 1].toString();
        return (
            <Container>
                <Header/>
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

                    <TouchableOpacity style={{alignItems: 'center'}}>
                        <Text style={{
                            fontSize: 22, marginTop: 25, marginBottom: 20,
                            color: '#002066',
                            fontWeight: 'bold',
                        }}>Add to Cart</Text>
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

export default connect(mapStateToProps, {})(ProductDetail);
