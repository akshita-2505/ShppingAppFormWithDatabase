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
import {getadminproduct} from '../actions/productAction';
import {Container, Left,Body,Right} from "native-base";
import Header from '../components/commonHeader';

class ShowAdminProduct extends Component{
    static defaultNavigationOptions = {
        headerMode:'none',
        header: null,
    };
    constructor(props) {
        super(props);
        this.state = {
            productList: []
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
            const value = await AsyncStorage.getItem('user');
            const email = (JSON.parse(value).login);
            alert(email)
            debugger
            this.props.getadminproduct(email)
        }catch(error){
            alert("no")
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

    // onRefresh = () => {
    //     this.setState({refreshing: true});
    //     this.props.getcategory().then(res => {
    //         this.setState({refreshing: false});
    //     });
    // };

    // onRowClick = (item) => {
    //     this.props.navigation.navigate('SubCategory',{id: item.id});
    // };

    renderItem = ({item, index}) => {
        const {navigate} = this.props.navigation;
        const uri = item.image.split("/");
        let imageUri = 'http://localhost:3000/' + uri[uri.length - 1].toString();
        return (
            <View style={{flex: 1, borderRadius: 10, borderWidth: 1,height:100,width:100,margin:10}}>
                <TouchableOpacity onPress={()=>this.onRowClick(item)}>
                    <Image key={index} source={{uri: imageUri}}
                           style={{height: '100%', width: '100%',opacity:.5}}/>
                    <Text style={{alignSelf: 'center',top:40,position: 'absolute',fontSize: 15,fontWeight:'bold',color: 'black'}}>{item.name}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        const {productList} = this.props;

        return (
            <Container>
                <Header/>
                <FlatList data={productList}
                          horizontal={false}
                          contentContainerStyle={{top: 10}}
                          automaticallyAdjustContentInsets={false}
                          renderItem={this.renderItem}
                          numColumns={3}
                          ListEmptyComponent={this.renderEmpty}
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
    getadminproduct,
})(ShowAdminProduct);
