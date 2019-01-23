import { createStackNavigator, createAppContainer ,createDrawerNavigator} from 'react-navigation';
import Accounts from '../components/account';
import UserRegistration from '../components/registration';
import Login from '../components/login';
import Signup from '../components/signup';
import Product from '../components/addProduct';
import ProductDetail from '../components/productDetail';
import Tab from '../navigation/TabNavigator';
import SubCategory from '../components/subCategory';
import Welcome from '../components/welcome';

const AppNavigator = createStackNavigator({
    Signup,
    UserRegistration,
    Login,
    Accounts,
    Product,
    Tab,
    ProductDetail,
    SubCategory,
    Welcome
},{
    initialRouteName:'Welcome',
    headerMode:'none'
});


const NavigationContainer = createAppContainer(AppNavigator);

export default NavigationContainer;