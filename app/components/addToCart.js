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
import {Container, Left, Body, Right, Header, Card, CardItem} from "native-base";
import {getItemByEmail,deleteItem} from '../actions/addtocartAction';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import IconS from 'react-native-vector-icons/SimpleLineIcons';
import Constants from '../helper/themeHelper';
import IconA from "./productDetail";
import { SimpleStepper } from 'react-native-simple-stepper';

class AddToCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            cartList: [],
            value: 0
        }
    }

    componentWillMount() {
        this.getData()

    }
    deleteItem(id){
        this.props.deleteItem(id).then(res => {
            this.setState({refreshing: false});
        });
        this.onRefresh()
    }
    getData = async () => {
        const username = await AsyncStorage.getItem('user');
        const email = JSON.parse(username).email;
        this.props.getItemByEmail(email).then(res => {
            this.setState({refreshing: false});
        });
    }
    keyExtractor = (item) => {
        return item.id + "";
    };

    renderSeparator = ({leadingItem, section}) => {
        return <View style={{height: 2}}/>;
    };

    renderEmpty = () => {
        return <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 15, color: 'white'}}>
                {"No data found"}
            </Text>
        </View>
    };

    onRefresh = async () => {
        const username = await AsyncStorage.getItem('user');
        const email = JSON.parse(username).email;
        this.setState({refreshing: true});
        this.setState({quantity: 1});
        this.props.getItemByEmail(email).then(res => {
            this.setState({refreshing: false});
        });
    };
    valueChanged(value) {
        // Truncate value to 2 decimal places and cast as Number (like the demo).
        const nextValue = Number(value.toFixed(2));
        this.setState({ value: nextValue });
        // ...
    }
    renderItem = ({item, index}) => {
        const { value } = this.state;
        const {navigate} = this.props.navigation;
        const uri = item.image.split("/");
        let imageUri = 'http://localhost:3000/' + uri[uri.length - 1].toString();
        return (
            <View style={{flex: 1,height:100, margin: 10,borderWidth: 0.5,flexDirection:'row'}}>
                <View style={{flex: 1,alignItems:'center',justifyContent:'center'}}>
                    <Image source={{uri: imageUri}}
                           style={{height: '90%', width: '90%'}}/>
                </View>
                <View style={{flex: 2,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{
                        marginLeft:10,
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: 'black'
                    }}>${item.price}</Text>
                    <Text style={{
                        marginLeft:10,
                        fontSize: 18,
                        color: 'black'
                    }}>{item.name}</Text>
                    <Text style={{
                        marginLeft:10,
                        fontSize: 15,
                        color: 'black'
                    }}>{item.detail}</Text>

                </View>
                <View style={{flex:1}}>

                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                        <TouchableOpacity onPress={()=>{this.deleteItem(item.id)}}>
                        <Icon name={'delete'} size={25} color={'black'}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:1,flexDirection:'row'}}>
                        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                            <SimpleStepper value={value} valueChanged={(value) => {this.valueChanged(value)};
                                item.quantity = this.state.value} />

                            {/*<TouchableOpacity onPress={()=>{*/}
                                {/*debugger*/}
                                {/*this.setState({quantity:((this.state.quantity)+1)}, () => {*/}
                                    {/*item.quantity = this.state.quantity*/}
                                {/*})*/}
                            {/*}}>*/}
                                {/*<Icon name={'plus'} size={25} color={'black'}/>*/}
                            {/*</TouchableOpacity>*/}
                        </View>
                        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                            <TouchableOpacity onPress={()=>{
                                if(this.state.quantity > 0){
                                    this.setState({quantity:((this.state.quantity)-1)})
                                    item.quantity = this.state.quantity
                                }else{
                                    this.deleteItem(item.id)
                                }
                            }}>
                                <Icon name={'minus'} size={25} color={'black'}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{
                            marginLeft:10,
                            fontSize: 15,
                            color: 'black'
                        }}>qty: {item.quantity}</Text>
                    </View>

                </View>
            </View>
        )
    }

    render() {
        const {cartList} = this.props;
        return (
            <Container>
                <Header style={{backgroundColor: '#8080ff'}}>
                    <TouchableOpacity
                        style={{marginTop: Constants.screenHeight * 0.01}}
                        onPress={() => {
                            this.props.navigation.navigate('Home')
                        }}>
                        <IconS name={'arrow-left'} size={20} color={'white'}/>
                    </TouchableOpacity>
                    <Left/>
                    <Body>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: 'white',
                        marginLeft: 30,
                        top: -5
                    }}>Unique</Text>
                    </Body>
                    <Right/>

                    <TouchableOpacity
                        style={{marginTop: Constants.screenHeight * 0.01}}
                        onPress={() => {
                        }}>
                        <Icon name={'cart-outline'} size={30} color={'white'}/>
                    </TouchableOpacity>

                </Header>
                <FlatList data={cartList}
                    // horizontal={false}
                          contentContainerStyle={{top: 10}}
                          automaticallyAdjustContentInsets={false}
                          renderItem={this.renderItem}
                    // numColumns={3}
                          ListEmptyComponent={this.renderEmpty}
                          onRefresh={this.onRefresh}
                          refreshing={this.state.refreshing}
                          keyExtractor={this.keyExtractor}
                />
                {/*<TouchableOpacity onPress={()=>{}}*/}
                                  {/*style={{alignItems: 'center'}}>*/}
                    {/*<Text style={{*/}
                        {/*fontSize: 22,marginBottom: 30,*/}
                        {/*color: '#002066',*/}
                        {/*fontWeight: 'bold'*/}
                    {/*}}>Total</Text>*/}
                {/*</TouchableOpacity>*/}

            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    const {cartList} = state.addtocart;
    return {
        cartList
    };
};

export default connect(mapStateToProps, {
    getItemByEmail,
    deleteItem
})(AddToCart);
