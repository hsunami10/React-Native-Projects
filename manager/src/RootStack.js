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
    initialRouteName: 'Home',
    /* Default navigation options for all screens in this stack, if not overriden */
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#85aaf5'
      },
      headerTintColor: '#fff', // Text color in header
      headerTitleStyle: {
        fontWeight: 'bold',
      }
    }
  }
);

export default RootStack;
