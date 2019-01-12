import { createStackNavigator, createAppContainer } from 'react-navigation';
import Users from '../components/user';
import UsersDetails from '../components/userDetail';
import UserRegistration from '../components/registration';

const AppNavigator = createStackNavigator({
    UserRegistration,
    Users
},{
    initialRouteName: 'Users'
});

const NavigationContainer = createAppContainer(AppNavigator);

export default NavigationContainer;