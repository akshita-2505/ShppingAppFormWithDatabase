import { createStackNavigator, createAppContainer } from 'react-navigation';
import Users from '../components/user';
import UserRegistration from '../components/registration';
import Login from '../components/login';
import Signup from '../components/signup';
import Product from '../components/product';
import Home from '../components/home';
import ProductDetail from '../components/productDetail';

const AppNavigator = createStackNavigator({
    Signup,
    UserRegistration,
    Login,
    Users,
    Product,
    Home,
    ProductDetail
},{
    initialRouteName:'Home',
    headerMode:'none'
});

const NavigationContainer = createAppContainer(AppNavigator);

export default NavigationContainer;