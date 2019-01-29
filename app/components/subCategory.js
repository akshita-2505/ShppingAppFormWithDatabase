import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    FlatList,
    ScrollView,
    Image,
    View,
    TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {Container, Left, Body, Right,Header} from "native-base";
import {getsubCategoryByIdOnHome} from '../actions/subcategoryAction';
import {getproduct,getProductById} from '../actions/productAction';
import Constants from "../helper/themeHelper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import IconS from 'react-native-vector-icons/SimpleLineIcons';

class SubCategory extends Component {
    // static navigationOptions = {
    //     headerMode:'float'
    // };
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            productList: [],
            subcategoryList: [],
            title:'All Products'
        }
    }

    keyExtractor = (item) => {
        return item.id + "";
    };

    componentDidMount() {
        const {navigation} = this.props;
        const item = navigation.getParam('id','No-Id');
        this.props.getsubCategoryByIdOnHome(item.id)
        this.props.getProductById(item.id)
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
        const {navigation} = this.props;
        const item = navigation.getParam('id','No-Id');
        this.setState({refreshing: true});
        this.props.getsubCategoryByIdOnHome(item.id).then(res => {
            this.setState({refreshing: false});
        });
        this.props.getproduct().then(res => {
            this.setState({refreshing: false});
        });
    };

    onRowClick = (item) => {
        const {navigation} = this.props;
        this.setState({title:item.name})
        if(item.scid == undefined){
            this.props.getProductById(item.id).then(res => {
            }).catch(err => {
                alert("failed")
            })
        }else{
            navigation.navigate('ProductDetail',{detail: item});
        }
    };

    renderItem = ({item, index}) => {
        const {navigate} = this.props.navigation;
        const uri = item.image.split("/");
        let imageUri = 'http://localhost:3000/' + uri[uri.length - 1].toString();
        if (!item.scid) {
            return (
                <View style={{borderRadius: 10, borderWidth: 0.5, height: 100, width: 100, margin: 10}}>
                    <TouchableOpacity onPress={() => this.onRowClick(item)}>
                        <Image key={index} source={{uri: imageUri}}
                               style={{height: '100%', width: '100%', opacity: .7}}/>
                        <Text style={{
                            alignSelf: 'center',
                            top: 40,
                            position: 'absolute',
                            fontSize: 15,
                            fontWeight: 'bold',
                            color: 'black'
                        }}>{item.name}</Text>

                    </TouchableOpacity>
                </View>
            )
        } else {
            return (
                <View style={{
                    // borderRadius: 10,
                    // borderWidth: 0.5,
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
    }
    render() {
        const {navigation} = this.props;
        const item = navigation.getParam('id','No-Id');
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
                        // onPress={() => {this.props.navigation.navigate('AddToCart')}}
                        >
                        <Icon name={'cart-outline'} size={30} color={'white'}/>
                    </TouchableOpacity>

                </Header>
                <ScrollView>
                <View style={{height:40,backgroundColor:'#ccddff',justifyContent: 'center'}}><Text style={{fontSize:20,fontWeight: 'bold',marginLeft:10}}>{item.name}</Text></View>
                <View style={{height: 150}}>
                    <FlatList data={this.props.subcategoryList}
                              horizontal={true}
                              style={{height: 50}}
                              contentContainerStyle={{top: 5}}
                              automaticallyAdjustContentInsets={false}
                              renderItem={this.renderItem}
                              ListEmptyComponent={this.renderEmpty}
                              onRefresh={this.onRefresh}
                              refreshing={this.state.refreshing}
                              keyExtractor={this.keyExtractor}
                    />
                </View>
                <View style={{height:40,backgroundColor:'#ccddff',justifyContent: 'center'}}><Text style={{fontSize:20,fontWeight: 'bold',marginLeft:10}}>{this.state.title}</Text></View>
                <View style={{flex: 1}}>
                    <FlatList data={this.props.productList}
                              horizontal={false}
                              // style={{width:Constants.screenWidth}}
                              contentContainerStyle={{top: 10}}
                              automaticallyAdjustContentInsets={true}
                              renderItem={this.renderItem}
                              numColumns={3}
                              ListEmptyComponent={this.renderEmpty}
                              onRefresh={this.onRefresh}
                              refreshing={this.state.refreshing}
                              keyExtractor={this.keyExtractor}
                    />
                </View>
                </ScrollView>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    const {subcategoryList} = state.subcategory;
    const {productList} = state.product;
    return {
        subcategoryList, productList
    };
};

export default connect(mapStateToProps, {
    getsubCategoryByIdOnHome,
    getproduct,
    getProductById
})(SubCategory);
