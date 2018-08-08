import { createStackNavigator } from 'react-navigation';
import {
  LoginScreen,
  EmployeeListScreen,
  EmployeeCreateScreen
} from './screens';

// route configuration, stacknavigator configuration
const RootStack = createStackNavigator(
  {
    Home: LoginScreen,
    EmployeeList: EmployeeListScreen,
    EmployeeCreate: EmployeeCreateScreen
  },
  {
    initialRouteName: 'Home',
    /* Default navigation options for all screens in this stack, if not overriden */
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#eeecef'
      },
      headerTintColor: '#000', // Text color in header
      headerTitleStyle: {
        fontWeight: 'bold',
      }
    }
  }
);

export default RootStack;
