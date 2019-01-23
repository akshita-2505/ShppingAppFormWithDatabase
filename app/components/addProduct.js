import React, { Component } from 'react';
import {ScrollView, Text, TouchableOpacity, Image, ImageBackground} from 'react-native';
import {View, Left, Right, Button, Icon, Item, Input, Picker} from 'native-base';
import IconM from 'react-native-vector-icons/MaterialIcons';
import {connect} from "react-redux";
import ImagePicker from 'react-native-image-picker';
import {getproduct,productAdd} from "../actions/productAction";
import {NavigationActions, StackActions} from "react-navigation";


class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            price: 0,
            quntity: 1,
            detail:'',
            image:null,
            productList: [],
            type: false,
            hasError: false,
            errorText: '',
            cid:1,
            selected:"",
            scid:1
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

    addproduct=()=>{
        const {name, quntity, price, detail,cid,scid,image} = this.state;

        const formData = new FormData();
        formData.append('image',{
            uri: image,
            type: 'image/jpeg',
            name: 'photo.jpg',
        });
        formData.append("name",name);
        formData.append("cid",cid);
        formData.append("scid",scid);
        formData.append("quntity",quntity);
        formData.append("price",price);
        formData.append("detail",detail);

        this.props.productAdd(formData).then(res => {
            const {navigation} = this.props;
            navigation.dispatch(StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Users' })],
            }));
        }).catch(err=>{
            alert("Registration failed")
        })
    }

    render() {
        var data = [["Electronices","Cloths"]];
        return(

                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingLeft: 50, paddingRight: 50,paddingTop:100}}>
                    <View style={{alignItems:"center", width: '100%',marginTop:20}}>
                        <TouchableOpacity onPress={() =>{this.image()}} >
                            <Image source={this.state.image}  style={{borderRadius:50,width:130,height:130,marginLeft:20,backgroundColor:"#475766"}}/>
                        </TouchableOpacity>

                    </View>
                    <Item>
                        <Input placeholder='Product Name' onChangeText={(name) => this.setState({name})} placeholderTextColor="#6B8E23" style={{color:'#6B8E23'}}/>
                    </Item>
                    <Item>
                        <Input placeholder='Quntity' onChangeText={(quntity) => this.setState({quntity})} placeholderTextColor="#6B8E23" style={{color:'#6B8E23'}}/>
                    </Item>
                    <Item>
                        <Input placeholder='Price' onChangeText={(price) => this.setState({price})} placeholderTextColor="#6B8E23" style={{color:'#6B8E23'}}/>
                    </Item>
                    <Item>
                        <Input placeholder='Detail' onChangeText={(detail) => this.setState({detail})} placeholderTextColor="#6B8E23" style={{color:'#6B8E23'}}/>
                    </Item>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingLeft: 50, paddingRight: 50}}>

                        {this.state.hasError?<Text style={{color: "#c0392b", textAlign: 'center', marginTop: 10}}>{this.state.errorText}</Text>:null}
                        <View style={{alignItems: 'center',width:"100%",justifyContent:"center"}}>
                            <TouchableOpacity onPress={() => this.addproduct()} style={{backgroundColor: "transprant", marginTop: 20,width:"100%",height:30,textAlign: 'center'}}>
                                <Text style={{color: '#D2691E',textAlign: 'center',paddingTop: 5,paddingLeft:10,fontSize:20}}>Add Product</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

        );
    }
    validation() {
        if(this.state.name===""||this.state.detail==="") {
            this.setState({hasError: true, errorText: 'Please fill all fields !'});
            return true;
        }
        return false;
        this.setState({hasError: false});
    }
}


const mapStateToProps = (state) => {
    const {productList} = state.product;
    return {
        productList
    };
};

export default connect(mapStateToProps,{
    getproduct,
    productAdd
})(AddProduct);
