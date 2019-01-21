import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    FlatList,
    ActivityIndicator,
    ScrollView,
    Image,
    Button,
    View,
    TouchableOpacity,
    ImageBackground,
    SafeAreaView
} from 'react-native';
import {connect} from 'react-redux';
import {Card} from 'react-native-elements'
import {getproduct,getProductById} from '../actions/productAction';
import {deleteUser} from "../actions/userAction";
import {NavigationActions, StackActions} from "react-navigation";

class CatProduct extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            productList: []
        }
    }

    keyExtractor = (item) => {
        return item.id + "";
    };

    componentDidMount() {
        this.props.getproduct()
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
        this.props.getproduct().then(res => {
            this.setState({refreshing: false});
        });
    };

    onRowClick = (item) => {
        // this.props.navigation.navigate('Users',{userDetail: item});
    };

    getOneProduct=(id)=>{
        this.props.getProductById({id}).then(res => {
            const {navigation} = this.props;
            navigation.dispatch(StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({routeName: 'ProductDetail'})],
            }));
        }).catch(err => {
            alert("failed")
        })
    }

    renderItem = ({item, index}) => {
        const {navigate} = this.props.navigation;
        const uri = item.image.split("/");
        let imageUri = 'http://localhost:3000/' + uri[uri.length - 1].toString();
        return (
            <Card style={{backgroundColor: "red" }}>
                <View style={{flex:1,flexDirection: 'row'}}>
                    <View style={{flex: 1,backgroundColor:'skyblue',borderRadius:10,borderWidth: 1}}>
                        <Image source={{uri: imageUri}} style={{height: '100%', width: '100%'}}/>
                    </View>
                    <View style={{flex: 1.4}}>
                        <Text style={{marginBottom: 10,marginLeft: 5,fontWeight:'bold',fontSize:17}}>
                            ${item.price}
                        </Text>
                        <Text style={{marginBottom: 10,marginLeft: 5}}>
                            Detail:{item.detail}
                        </Text>
                        <View style={{backgroundColor:'#D2691E',marginBottom:0,marginLeft: 5,color:"black"}}>
                        <TouchableOpacity onPress={()=>{this.getOneProduct(item.id)}} style={{alignItems: "center",justifyContent:'center',height:35}}>
                            <Text style={{fontSize:17}}>
                                View
                            </Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Card>
        )
    }

    render() {
        const {productList} = this.props;
        return (
            <ImageBackground source={require('../image/bg.jpg')} style={{width: '100%', height: '100%'}}>
                <SafeAreaView>

                    <View style={styles.container}>
                        <View style={{backgroundColor:'#D2691E',height:40}}/>
                        <ScrollView>
                        <FlatList data={productList}
                                  contentContainerStyle={{top: 10}}
                                  automaticallyAdjustContentInsets={false}
                                  renderItem={this.renderItem}
                                  keyExtractor={this.keyExtractor}
                                  ItemSeparatorComponent={this.renderSeparator}
                                  ListEmptyComponent={this.renderEmpty}
                                  ListFooterComponent={<View style={{height: 30}}/>}
                        />
                        </ScrollView>
                    </View>
                </SafeAreaView>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({

    MainContainer: {
        justifyContent: 'center',
        flex: 1,
        margin: 10
    },

    TextInputStyleClass: {
        textAlign: 'center',
        marginBottom: 7,
        height: 45,
        borderWidth: 1,
        borderColor: '#2196F3',
        borderRadius: 25,
        color: "white"
    },

    title: {
        fontSize: 22,
        color: "#009688",
        textAlign: 'center',
        marginBottom: 15
    }
});

const mapStateToProps = (state) => {
    const {productList} = state.product;
    return {
        productList
    };
};

export default connect(mapStateToProps, {
    getproduct,
                            getProductById
})(CatProduct);
