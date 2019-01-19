import { createStackNavigator, createAppContainer } from 'react-navigation';
import Users from '../components/user';
import UserRegistration from '../components/registration';
import Login from '../components/login';
import Signup from '../components/signup';

const AppNavigator = createStackNavigator({
    Signup,
    UserRegistration,
    Login,
    Users
},{
    initialRoute:Login
});

const NavigationContainer = createAppContainer(AppNavigator);

export default NavigationContainer;