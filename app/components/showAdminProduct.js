import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    FlatList,
    ScrollView,
    AsyncStorage,
    Image,
    View,
    TouchableOpacity,
    SafeAreaView
} from 'react-native';
import {connect} from 'react-redux';
import {getProductByEmail} from '../actions/productAction';
import {Container, Left,Body,Right,Header} from "native-base";
import Constants from "../helper/themeHelper";
import IconS from 'react-native-vector-icons/SimpleLineIcons';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons'

class ShowAdminProduct extends Component{
    static defaultNavigationOptions = {
        headerMode:'none',
        header: null,
    };
    constructor(props) {
        super(props);
        this.state = {
            productList: [],
            refreshing:false,
        }
    }

    keyExtractor = (item) => {
        return item.id + "";
    };

    componentDidMount() {
        this.getData()
    }

    getData = async () => {
        try {
            const username = await AsyncStorage.getItem('user');
            const email = JSON.parse(username).email;
            if (email !== null) {
                    this.props.getProductByEmail(email);
                this.setState({refreshing: false});
            } else {
                this.props.navigation.navigate('Login')
            }
        } catch (error) {
            console.log(error)
        }
    }

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

    onRefresh = () => {
        this.setState({refreshing: true});
        this.getData()
    };

    onRowClick = (item) => {
           this.props.navigation.navigate('AdminProductDetail',{detail: item});
    };

    renderItem = ({item, index}) => {
        const {navigate} = this.props.navigation;
        const uri = item.image.split("/");
        let imageUri = 'http://localhost:3000/' + uri[uri.length - 1].toString();
        return (
            <View style={{
                height: 100,
                width: 100,
                margin: 10,
                marginVertical: 30
            }}>
                <TouchableOpacity onPress={() => this.onRowClick(item)}>
                    <Image key={index} source={{uri: imageUri}}
                           style={{height: '100%', width: '100%', opacity: 1}}/>
                    <View>
                        <Text style={{fontSize: 15}}>${item.price}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        const {productList} = this.props;

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
                <FlatList data={productList}
                          horizontal={false}
                          contentContainerStyle={{top: 10}}
                          automaticallyAdjustContentInsets={false}
                          renderItem={this.renderItem}
                          numColumns={3}
                          ListEmptyComponent={this.renderEmpty}
                          onRefresh={this.onRefresh}
                          refreshing={this.state.refreshing}
                />
            </Container>
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
    getProductByEmail,
})(ShowAdminProduct);
