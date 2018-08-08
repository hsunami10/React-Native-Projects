import { createStackNavigator } from 'react-navigation';
import {
  LoginScreen,
  EmployeeListScreen
} from './screens';

// route configuration, stacknavigator configuration
const RootStack = createStackNavigator(
  {
    Home: LoginScreen,
    EmployeeList: EmployeeListScreen,
  },
  {
    initialRouteName: 'Home'
  }
);

export default RootStack;
