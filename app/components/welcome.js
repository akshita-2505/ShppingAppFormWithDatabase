// import React, {PureComponent} from 'react';
// import { StyleSheet,
//      View, Button,TouchableOpacity
// } from 'react-native';
// import { connect } from 'react-redux';
// import { BottomNavigation, Text } from 'react-native-paper';
// import { Container, Left, Right, Icon, Item, Input } from 'native-base';
// import {createAppContainer, createDrawerNavigator} from 'react-navigation';
// import UserRegistration from '../components/registration';
//
// const Home = () => <Text>Home</Text>;
// const Cart = () => <Text>Cart</Text>;
//
// export default class Welcome extends PureComponent {
//     constructor(props){
//         super(props);
//         this.state={
//             index: 0,
//             routes: [
//                 { key: 'home', title: 'Home', icon: 'home' },
//                 { key: 'cart', title: 'Cart', icon: 'shopping-cart' },
//             ],
//         }
//     }
//     static navigationOptions = {
//         visibility:true,
//         headerTintColor: 'black',
//         headerLeft: <TouchableOpacity onPress={()=>{}}>
//             <Icon active name='menu' style={{color: "#6B8E23",marginLeft:10}}/>
//             </TouchableOpacity>,
//         headerRight:<TouchableOpacity>
//             <Icon active name='menu' style={{color: "#6B8E23",marginRight:10}}/>
//         </TouchableOpacity>
//
//     };
//
//     _handleIndexChange = index => this.setState({ index });
//
//     _renderScene = BottomNavigation.SceneMap({
//         home: Home,
//         cart: Cart
//     });
//     render() {
//         const {navigate} = this.props.navigation;
//        return (
//            <BottomNavigation
//                navigationState={this.state}
//                onIndexChange={this._handleIndexChange}
//                renderScene={this._renderScene}
//             />
//
//        );
//     }
// }
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent:'center',
//     }
// });
