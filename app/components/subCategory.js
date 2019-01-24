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
import Header from '../components/commonHeader';
import {Container, Left, Body, Right} from "native-base";
import {Title} from "react-native-paper";
import {getsubCategoryById} from '../actions/subcategoryAction';
import {getproduct,getProductById} from '../actions/productAction';

class SubCategory extends Component {
    static navigationOptions = {
        title: 'Unique',
    };
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            productList: [],
            subcategoryList: []
        }
    }

    keyExtractor = (item) => {
        return item.id + "";
    };

    componentDidMount() {
        const {navigation} = this.props;
        const id = navigation.getParam('id','No-Id');
        this.props.getsubCategoryById({id})
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

    // onRefresh = () => {
    //     this.setState({refreshing: true});
    //     this.props.getsubcategory().then(res => {
    //         this.setState({refreshing: false});
    //     });
    //     this.props.getproduct().then(res => {
    //         this.setState({refreshing: false});
    //     });
    // };
    // componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
    //     const {productData} = this.props;
    //     this.setState({productList:productList})
    // }

    onRowClick = (item) => {
        debugger
        const {navigation} = this.props;
        if(item.scid == undefined){
            var id = item.id
            this.props.getProductById({id}).then(res => {
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
        if(!item.scid){
            return (
            <View style={{borderRadius: 10, borderWidth: 0.5, height: 100, width: 100, margin: 10}}>
                <TouchableOpacity onPress={() => this.onRowClick(item)}>
                    <Image key={index} source={{uri: imageUri}}
                           style={{height: '100%', width: '100%',opacity:.7}}/>
                    <Text style={{alignSelf: 'center',top:40,position: 'absolute',fontSize: 15,fontWeight:'bold',color: 'black'}}>{item.name}</Text>

                </TouchableOpacity>
            </View>
            )}else{
            return (
                <View style={{borderRadius: 10, borderWidth: 0.5, height: 100, width: 100, margin: 10,marginVertical: 30}}>
                    <TouchableOpacity onPress={() => this.onRowClick(item)}>
                        <Image key={index} source={{uri: imageUri}}
                               style={{height: '100%', width: '100%',opacity:1}}/>
                        <View>
                            <Text style={{fontSize:15}}>${item.price}</Text>
                        </View>
                    </TouchableOpacity>
                </View>


            )
        }

    }

    render() {
        const {navigation} = this.props;
        return (
            <Container>
                <Header/>
                <View style={{height:40,backgroundColor:'#ccddff',justifyContent: 'center'}}><Text style={{fontSize:20,fontWeight: 'bold',marginLeft:10}}>SubCategory</Text></View>
                <View style={{height: 150}}>
                    <FlatList data={this.props.subcategoryList}
                              horizontal={true}
                              style={{height: 50}}
                              contentContainerStyle={{top: 5}}
                              automaticallyAdjustContentInsets={false}
                              renderItem={this.renderItem}
                              ListEmptyComponent={this.renderEmpty}
                    />
                </View>
                <View style={{height:40,backgroundColor:'#ccddff',justifyContent: 'center'}}><Text style={{fontSize:20,fontWeight: 'bold',marginLeft:10}}>Products</Text></View>
                <View style={{flex: 1}}>
                    <FlatList data={this.props.productList}
                              horizontal={false}
                              contentContainerStyle={{top: 5}}
                              automaticallyAdjustContentInsets={false}
                              renderItem={this.renderItem}
                              numColumns={3}
                              ListEmptyComponent={this.renderEmpty}
                    />
                </View>
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
    getsubCategoryById,
    getproduct,
    getProductById
})(SubCategory);
