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
import AddProduct from '../components/addProduct';
import ShowAdminProduct from '../components/showAdminProduct';

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
    CommonHeader,
    AddProduct,
    ShowAdminProduct
},{
    initialRouteName:'Welcome',
    headerMode: 'none'
    // headerMode : 'screen'
});


const NavigationContainer = createAppContainer(AppNavigator);

export default NavigationContainer;