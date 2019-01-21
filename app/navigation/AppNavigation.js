import { createStackNavigator, createAppContainer } from 'react-navigation';
import Users from '../components/user';
import UserRegistration from '../components/registration';
import Login from '../components/login';
import Signup from '../components/signup';
import Product from '../components/product';
import CatProduct from '../components/catProduct';
import ProductDetail from '../components/productDetail';
import Home from '../components/home';
import Common from '../components/common';

const AppNavigator = createStackNavigator({
    Signup,
    UserRegistration,
    Login,
    Users,
    Product,
    Home,
    ProductDetail,
    CatProduct,
    Common
},{
    initialRouteName:'Home',
    headerMode:'none'
});

const NavigationContainer = createAppContainer(AppNavigator);

export default NavigationContainer;