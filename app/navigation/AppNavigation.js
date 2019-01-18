import { createStackNavigator, createAppContainer,createDrawerNavigator } from 'react-navigation';
import Users from '../components/user';
import UserRegistration from '../components/registration';
import Login from '../components/login';
import Signup from '../components/signup';
import Welcome from '../components/welcome';

const AppNavigator1 = createDrawerNavigator({
    UserRegistration,
    Users,
    Login,
    Signup
});
const AppNavigator = createStackNavigator({
    Welcome
});

const NavigationContainer = createAppContainer(AppNavigator,AppNavigator1);

export default NavigationContainer;