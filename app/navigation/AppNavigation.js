import { createStackNavigator, createAppContainer ,createDrawerNavigator} from 'react-navigation';
import Accounts from '../components/account';
import UserRegistration from '../components/registration';
import Login from '../components/login';
import Signup from '../components/signup';
import ProductDetail from '../components/productDetail';
import Tab from '../navigation/TabNavigator';
import SubCategory from '../components/subCategory';
import Welcome from '../components/welcome';
import AdminTabNavigator from '../navigation/AdminTabNavigator';
import CommonHeader from '../components/commonHeader';

const AppNavigator = createStackNavigator({
    Signup,
    UserRegistration,
    Login,
    Accounts,
    Tab,
    ProductDetail,
    SubCategory,
    Welcome,
    AdminTabNavigator,
    CommonHeader
},{
    initialRouteName:'AdminTabNavigator',
    headerMode: 'none'
});


const NavigationContainer = createAppContainer(AppNavigator);

export default NavigationContainer;