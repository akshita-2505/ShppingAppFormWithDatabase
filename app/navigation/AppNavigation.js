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
import AdminProductDetail from '../components/adminProductDetail';
import AddToCart from '../components/addToCart';
import UpdateProduct from '../components/updateProduct';

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
    ShowAdminProduct,
    AdminProductDetail,
    AddToCart,
    UpdateProduct
},{
    initialRouteName:'Welcome',
    headerMode: 'none'
});


const NavigationContainer = createAppContainer(AppNavigator);

export default NavigationContainer;