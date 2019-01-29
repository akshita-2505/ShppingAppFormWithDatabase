import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    FlatList,
    ScrollView,
    Image,
    View,
    Button,
    TouchableOpacity, AsyncStorage,
} from 'react-native';
import {connect} from 'react-redux';
import {Container, Left, Body, Right,Header,Card,CardItem} from "native-base";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import IconS from 'react-native-vector-icons/SimpleLineIcons';
import Constants from '../helper/themeHelper';


export default class AddToCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:'',
            image:'',
            refreshing:false
        }
    }

    componentWillMount(){
        this.getData()
    }
    getData = async()=>{
        try {
            AsyncStorage.getItem('favorite').then((value)=>{
                alert(value)
                const uri = JSON.parse(value).image.split("/");
                let imageUri = 'http://localhost:3000/' + uri[uri.length - 1].toString();
                this.setState({data:(JSON.parse(value)),image:imageUri})
                // alert(imageUri)
            }).then(res=>{
                // alert(res)
            })
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return (
            <Container>
                <Header style={{backgroundColor:'#8080ff'}}>
                    <TouchableOpacity
                        style={{marginTop: Constants.screenHeight * 0.01}}
                        onPress={() => {this.props.navigation.navigate('Home')
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
                <View>
                    <Card>

                    <Text>{this.state.data.name}</Text>
                    <Image source={{uri:this.state.image}} style={{height:100,width:100}}/>
                    </Card>
                </View>
            </Container>
        );
    }
}
