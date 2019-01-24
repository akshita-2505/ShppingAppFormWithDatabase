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
import {getcategory} from '../actions/categoryAction';
import {Container, Left,Body,Right} from "native-base";
import Header from '../components/commonHeader';

class Home extends Component{
    static navigationOptions = {
        // headerMode:'none',
        header: null
            // { visible:false }
    };
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            categoryList: []
        }
    }

    keyExtractor = (item) => {
        return item.id + "";
    };

    componentDidMount() {

        this.storeData()
        this.props.getcategory()
    }

    storeData = async () => {
        debugger
        const {navigation} = this.props;
        const login = navigation.getParam('username','no')
        const type = navigation.getParam('type','No-type')
        try {
            await AsyncStorage.setItem('user', JSON.stringify({login:login,type:type}));
        } catch (error) {
            alert("async error");
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
        this.props.getcategory().then(res => {
            this.setState({refreshing: false});
        });
    };

    onRowClick = (item) => {
         this.props.navigation.navigate('SubCategory',{id: item.id});
    };

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
        const {categoryList} = this.props;

        return (
            <Container>
                <Header/>
                <View style={{height:40,backgroundColor:'#ccddff',justifyContent: 'center'}}><Text style={{fontSize:20,fontWeight: 'bold',marginLeft:10}}>Category</Text></View>
                    <FlatList data={categoryList}
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
    const {categoryList} = state.category;
    return {
        categoryList
    };
};

export default connect(mapStateToProps, {
    getcategory,
})(Home);
