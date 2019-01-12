import React, {PureComponent} from 'react';
import {FlatList, StyleSheet,
    Text, View, Button,
    TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import {getUser} from "../actions/userAction";
import {deleteUser} from "../actions/userAction";

import {NavigationActions, StackActions} from "react-navigation";

class Users extends PureComponent {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'User List'
        };
    };

    constructor(props){
        super(props);
        this.state={
            refreshing: false,
            userList: []
        }
    }
    componentWillReceiveProps(nextProps, nextState){
        console.log("componentWillReceiveProps");
        console.log(nextProps);
    }

    keyExtractor = (item) => {
        return item.id + "";
    };

    renderSeparator = ({leadingItem, section})=>{
        return <View style={{height:10}}/>;
    };

    renderEmpty = () => {
        return <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <Text style={{fontSize:15}}>
                {"No data found"}
            </Text>
        </View>
    };

    onRefresh = () => {
        this.setState({refreshing: true});
        this.props.getUser().then(res=>{
            this.setState({refreshing: false});
        });
    };

    onRowClick = (item) => {
        this.props.navigation.navigate('UserDetails',{userDetail: item});
    };

    deleteData=(id)=>{
        this.props.deleteUser({id}).then(res=>{
             const {navigation} = this.props;
            navigation.dispatch(contactAction.deleteContact(id));

        }).catch(err=>{
            alert("delete failed")
        })
    }

    renderItem = ({item, index}) => {
        const {rowContainer} = styles;
        return(
            <TouchableOpacity onPress={()=>this.onRowClick(item)}>
                <View key={index} style={rowContainer}>
                    <Text style={{fontSize: 20}}>
                        FirstName: {item.firstName}</Text>
                    <Text style={{fontSize: 20}}>Email: {item.email}</Text>
                    <Text style={{fontSize: 20}}>id: {item.id}</Text>
                    <TouchableOpacity onPress={this.deleteData(item.id)}>
                        <Text>Delete</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text>Update</Text>
                    </TouchableOpacity>

                </View>
            </TouchableOpacity>
        )
    };

    render() {
        const {refreshing} = this.state;
        const {userList} = this.props;
        return (
            <View style={styles.container}>
                <FlatList data={userList}
                          contentContainerStyle={{top:20}}
                          automaticallyAdjustContentInsets={false}
                          renderItem={this.renderItem}
                          keyExtractor={this.keyExtractor}
                          ItemSeparatorComponent={this.renderSeparator}
                          ListEmptyComponent={this.renderEmpty}
                          onRefresh={this.onRefresh}
                          refreshing={refreshing}
                          ListFooterComponent={<View style={{ height: 50}}/>}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
    },
    titleText: {
        fontSize: 12,
        alignSelf: 'center',
        marginBottom: 20
    },
    rowContainer: {
        borderRadius:5,
        padding:10,
        borderWidth:1,
        borderColor:'#bdbdbd',
        marginLeft:10,
        marginRight:10
    }
});

const mapStateToProps = (state) => {
    const {userList} = state.user;
    return {
        userList
    };
};

export default connect(mapStateToProps,{
    getUser,
    deleteUser
})(Users);