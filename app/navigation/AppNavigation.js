import { createStackNavigator, createAppContainer } from 'react-navigation';
import Users from '../components/user';
import UserRegistration from '../components/registration';
import Login from '../components/login';
import Signup from '../components/signup';
import Welcome from '../components/welcome';

const AppNavigator = createStackNavigator({
    UserRegistration,
    Users,
    Login,
    Signup,
    Welcome
},{
    initialRouteName: 'Welcome'
});

const NavigationContainer = createAppContainer(AppNavigator);

export default NavigationContainer;