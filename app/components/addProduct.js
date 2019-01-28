import React, {Component} from 'react';
import {ScrollView, Text, TouchableOpacity, Image, Picker} from 'react-native';
import {View, Left, Right, Button, Container, Item, Input} from 'native-base';
import IconM from 'react-native-vector-icons/MaterialIcons';
import {connect} from "react-redux";
import ImagePicker from 'react-native-image-picker';
import {getproduct, productAdd} from "../actions/productAction";
import {NavigationActions, StackActions} from "react-navigation";
import Icon from 'react-native-vector-icons/Feather'
import IconF from 'react-native-vector-icons/Foundation'
import Header from '../components/commonHeader';
import {getcategory} from '../actions/categoryAction';
import {getsubCategoryById} from '../actions/subcategoryAction';

class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            price: 0,
            quntity: 1,
            detail: '',
            image: null,
            productList: [],
            type: false,
            hasError: false,
            errorText: '',
            cid: '5',
            selected: "",
            scid: '5',
            categoryList: [],
            subcategoryList: []
        };
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
                    // alert(JSON.stringify(response.data))
                    // You can also display the image using data:
                    // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                    this.setState({
                        image: source,
                    });
                }
            });

        } catch (e) {
            console.log(e)
        }
    }

    addproduct = () => {
        debugger
        // if (!this.validation()) {
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

            this.props.productAdd(formData).then(res => {
                const {navigation} = this.props;
                navigation.dispatch(StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({routeName: 'Tab'})],

                }));
                // alert("Product added successfully");
            }).catch(err => {
                alert("failed")
            })
        // }
    }

    componentDidMount() {
        this.props.getcategory();
    }

    getSubCategoryData(value) {
        this.props.getsubCategoryById(value);
    }

    render() {
        const {categoryList} = this.props;
        const {subcategoryList} = this.props;
        return (
            <Container>
                <Header/>
                <ScrollView>
                    <View style={{justifyContent: 'center', marginLeft: 25, marginRight: 25, top: 30}}>
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
                                   placeholderTextColor="#80aaff" style={{color: '#1a62ff'}}/>
                        </Item>
                        <Item>
                            <Input placeholder='Quntity' onChangeText={(quntity) => this.setState({quntity})}
                                   placeholderTextColor="#80aaff" style={{color: '#1a62ff'}}/>
                        </Item>
                        <Item>
                            <IconF name='price-tag' style={{color: '#003399'}} size={30}/>
                            <Input placeholder='Price' onChangeText={(price) => this.setState({price})}
                                   placeholderTextColor="#80aaff" style={{color: '#1a62ff'}}/>
                        </Item>
                        <Item>
                            <Input placeholder='Detail' onChangeText={(detail) => this.setState({detail})}
                                   placeholderTextColor="#80aaff" style={{color: '#1a62ff'}}/>
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
                            }}>
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
                            }}>
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
                                borderRadius: 5, width: "100%", backgroundColor: '#ccddff', justifyContent: 'center'
                            }}>
                                <TouchableOpacity onPress={() => this.addproduct()}>
                                    <Text style={{
                                        color: '#002066',
                                        textAlign: 'center',
                                        justifyContent: 'center',
                                        fontSize: 22,
                                        fontWeight: 'bold',
                                        backgroundColor: '#ccddff'
                                    }}>Add Product</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
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
    productAdd,
    getcategory,
    getsubCategoryById
})(AddProduct);
