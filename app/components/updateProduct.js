import React, {Component} from 'react';
import {ScrollView, Text, TouchableOpacity, Image, Picker, AsyncStorage} from 'react-native';
import {View, Left, Right, Button, Container, Item, Input, Body,Header} from 'native-base';
import {connect} from "react-redux";
import ImagePicker from 'react-native-image-picker';
import {getproduct, productUpdate} from "../actions/productAction";
import {NavigationActions, StackActions} from "react-navigation";
import Icon from 'react-native-vector-icons/Feather'
import IconF from 'react-native-vector-icons/Foundation'
import IconM from 'react-native-vector-icons/MaterialCommunityIcons'
import {getcategory} from '../actions/categoryAction';
import {getsubCategoryById} from '../actions/subcategoryAction';
import * as Animatable from 'react-native-animatable';
import IconS from 'react-native-vector-icons/SimpleLineIcons';
import Constants from "../helper/themeHelper";

class UpdateProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // productData: props.navigation.state.params.data,
             name: '',
            price: 0,
            quntity: 1,
            detail: '',
            image: null,
            productList: [],
            type: false,
            hasError: false,
            errorText: '',
            cid: '',
            selected: "",
            scid: '',
            categoryList: [],
            subcategoryList: []
        };
    }
    componentDidMount() {
        const productData = this.props.navigation.getParam('data', 'no');
        this.setState({name:productData.name})
        this.setState({quntity:productData.quntity})
        this.setState({scid:productData.scid})
        this.setState({cid:productData.cid})
        this.setState({price:productData.price})
        this.setState({detail:productData.detail})

        this.props.getcategory();
    }
    image = () => {
        try {
            ImagePicker.showImagePicker({}, (response) => {
                console.log('Response = ', response);

                if (response.didCancel) {
                    console.log('image picker cancle');
                } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                    console.log('User tapped custom button: ', response.customButton);
                } else {
                    const source = {uri: response.uri};
                    this.setState({
                        image: source,
                    });
                }
            });

        } catch (e) {
            console.log(e)
        }
    }

    updateProduct = async (id) => {
        if (!this.validation()) {
            const username = await AsyncStorage.getItem('user');
            const email = JSON.parse(username).email;
            const {name, quntity, price, detail, cid, scid, image} = this.state;
            const formData = new FormData();
            formData.append('image', {
                uri: image,
                type: 'image/jpeg',
                name: 'photo.jpg',
            });
            formData.append("name", name);
            formData.append("cid", cid);
            formData.append("scid", scid);
            formData.append("quntity", quntity);
            formData.append("price", price);
            formData.append("detail", detail);
            formData.append("email", email);
            this.props.productUpdate(formData,id).then(res => {
                const {navigation} = this.props;
                navigation.dispatch(StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({routeName: 'AdminTabNavigator'})],

                }));
                alert("Product updated successfully");
            }).catch(err => {
                alert("failed")
            })
        }
    }

    getSubCategoryData(value) {
        this.props.getsubCategoryById(value);
    }

    render() {
        const {categoryList} = this.props;
        const {subcategoryList} = this.props;
        const productData = this.props.navigation.getParam('data', 'no');
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
                        <IconM name={'cart-outline'} size={30} color={'white'}/>
                    </TouchableOpacity>

                </Header>
                <ScrollView>
                    <Animatable.View animation="fadeInUpBig"
                                     style={{justifyContent: 'center', marginLeft: 25, marginRight: 25, top: 30}}>
                        <View style={{alignItems: "center", width: '100%', marginTop: 20}}>
                            <TouchableOpacity onPress={() => {
                                this.image()
                            }}>
                                <Image source={this.state.image} style={{
                                    borderRadius: 65,
                                    width: 130,
                                    height: 130,
                                    marginLeft: 20,
                                    backgroundColor: "#475766"
                                }}/>
                            </TouchableOpacity>

                        </View>
                        <Item style={{marginTop: 30}}>
                            <Icon name='shopping-bag' style={{color: '#003399'}} size={30}/>
                            <Input placeholder='Product Name' onChangeText={(name) => this.setState({name})}
                                   placeholderTextColor="#80aaff" style={{color: '#1a62ff'}} value={this.state.name}/>
                        </Item>
                        <Item>
                            <Input placeholder='Quntity' onChangeText={(quntity) => this.setState({quntity})}
                                   placeholderTextColor="#80aaff" style={{color: '#1a62ff'}} value={this.state.quntity}/>
                        </Item>
                        <Item>
                            <IconF name='price-tag' style={{color: '#003399'}} size={30}/>
                            <Input placeholder='Price' onChangeText={(price) => this.setState({price})}
                                   placeholderTextColor="#80aaff" style={{color: '#1a62ff'}} value={this.state.price}/>
                        </Item>
                        <Item>
                            <Input placeholder='Detail' onChangeText={(detail) => this.setState({detail})}
                                   placeholderTextColor="#80aaff" style={{color: '#1a62ff'}} value={this.state.detail}/>
                        </Item>

                        <Text style={{
                            marginTop: 15,
                            marginBottom: 10,
                            fontSize: 15,
                            marginLeft: 5,
                            color: '#1a62ff'
                        }}>Category:</Text>

                        <Picker
                            iosIcon={<Icon name="arrow-down"/>}
                            textStyle={{color: "#687373"}}
                            mode="dropdown"
                            selectedValue={this.state.cid}
                            onValueChange={(value) => {
                                this.setState({cid: value});
                                this.getSubCategoryData(value);
                            }}
                            value={this.state.cid}>
                            {
                                categoryList.map((item, index) => {
                                    return (<Picker.Item label={item.name} value={item.id} key={index}/>)
                                })
                            }
                        </Picker>
                        <Text style={{
                            marginTop: 15,
                            marginBottom: 10,
                            fontSize: 15,
                            marginLeft: 5,
                            color: '#1a62ff'
                        }}>SubCategory:</Text>
                        <Picker
                            iosIcon={<Icon name="arrow-down"/>}
                            textStyle={{color: "#687373"}}
                            mode="dropdown"
                            selectedValue={this.state.scid}
                            onValueChange={(value) => {
                                this.setState({scid: value});
                            }}
                            value={this.state.scid}>
                            {
                                subcategoryList.map((item, index) => {
                                    return (<Picker.Item label={item.name} value={item.id} key={index}/>)
                                })
                            }
                        </Picker>

                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingLeft: 50,
                            paddingRight: 50,
                            marginTop: 30,
                            marginBottom: 40
                        }}>

                            {this.state.hasError ? <Text style={{
                                color: "#c0392b",
                                textAlign: 'center',
                                marginTop: 10
                            }}>{this.state.errorText}</Text> : null}
                            <View style={{
                                alignItems: 'center',
                                borderRadius: 5, width: "100%", justifyContent: 'center'
                            }}>
                                <TouchableOpacity onPress={() => this.updateProduct(productData.id)}>
                                    <Text style={{
                                        color: '#002066',
                                        textAlign: 'center',
                                        justifyContent: 'center',
                                        fontSize: 22,
                                        fontWeight: 'bold',
                                        marginBottom:25
                                    }}>Update Product</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Animatable.View>
                </ScrollView>
            </Container>
        );
    }

    validation() {
        if (this.state.name === "" || this.state.detail === "" || this.state.price === "" || this.state.quntity === "") {
            this.setState({hasError: true, errorText: 'Please fill all fields !'});
            return true;
        }
        return false;
        this.setState({hasError: false});
    }
}


const mapStateToProps = (state) => {
    const {productList} = state.product;
    const {categoryList} = state.category;
    const {subcategoryList} = state.subcategory;
    return {
        productList, categoryList, subcategoryList
    };
};

export default connect(mapStateToProps, {
    getproduct,
    productUpdate,
    getcategory,
    getsubCategoryById
})(UpdateProduct);
//API issue