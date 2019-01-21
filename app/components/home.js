import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    View,
    Text,
    Picker
} from 'react-native';
import {connect} from 'react-redux';
import Nav from './common';
import {Dropdown} from 'react-native-material-dropdown';
import {getproduct, getProductById} from '../actions/productAction';
import {getcategory} from '../actions/productAction';

class Home extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            productList: [],
            refreshing: false
        }
    }

    renderItem() {
        this.props.getproduct().then(res => {
            res.map((item, index) => {
                var imageUrl = item.image.split("/");
                var url = "http://localhost:4000/" + imageUrl[imageUrl.length - 1].toString();
                return (
                    <View key={index} style={{flex: 2, backgroundColor: 'yellow'}}>
                        <Image source={{uri: url}} style={{width: 200, height: 200, backgroundColor: "#475766"}}/>
                        <Text>{item.name}</Text>
                    </View>
                )
            })
        })
    }

    render() {
        let category = [
            {value: 'Eletronices'},
            {value: 'Clothes'}];
        let subcategory = [
            {value: 'laptop'},
            {value: 'mobile'},
            {value: 'jeans'},
            {value: 'top'}];
        const {productList} = this.props;
        return (
            <View style={{flex: 1}}>
                <Nav/>
                <View style={{flex: 1}}>
                    <View style={{
                        height: 60,
                        justifyContent: 'center',
                        marginLeft: 10,
                        marginRight: 10,
                        flex:1}}>
                        <Dropdown
                            label='Category'
                            data={category}
                        />
                    </View>
                    <View style={{
                        height: 60,
                        justifyContent: 'center',
                        marginLeft: 10,
                        marginRight: 10,
                        flex:1
                    }}>
                        <Dropdown
                            label='Subcategory'
                            data={subcategory}
                            onChangeText={() => {
                                this.renderItem()
                            }}
                        />
                    </View>
                    <View style={{
                        backgroundColor: 'green',
                        height: 60,
                        justifyContent: 'center',
                        marginLeft: 10,
                        marginRight: 10,
                        flex:7
                    }}>
                    </View>
                </View>
            </View>
        );
     }
}

const mapStateToProps = (state) => {
    const {productList} = state.product;
    return {
        productList
    };
};

export default connect(mapStateToProps, {
    getproduct,
})(Home);

