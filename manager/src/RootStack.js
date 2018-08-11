import { createStackNavigator } from 'react-navigation';
import {
  LoginScreen,
  EmployeeListScreen,
  CreateEmployeeModal
} from './screens';

/*
2 parameters for createStackNavigator: Route Configurations, StackNavigator Configurations
'mode' changes the type of transition - applies to entire stack navigator
To have different transitions, add another navigation stack with a different mode (nested)

NOTE: ALL STACK NAVIGATORS DEFAULT WITH NAVIGATION HEADERS

For modals not having headers problem:
https://medium.com/4thought-studios/better-modals-in-react-navigation-56c649e0249
Nest another stack navigator for modals
Why? Stack inside "ModalStack" would have a navigation header, but would not be visible
until you open it
*/

// Stack to hold all main screens
const MainStack = createStackNavigator(
  {
    Home: {
      screen: LoginScreen
    },
    EmployeeList: {
      screen: EmployeeListScreen
    }
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

// Stack to hold all modals
const ModalStack = createStackNavigator(
  {
    CreateModal: {
      screen: CreateEmployeeModal
    }
  },
  {
    navigationOptions: {
      title: 'Modal Title'
    }
  }
);

// Looks at route configurations top to bottom
// If you swap "Main" and "Modals", it would show modals first
const RootStack = createStackNavigator(
  {
    Main: {
      screen: MainStack
    },
    Modals: {
      screen: ModalStack
    }
  },
  {
    mode: 'modal', // default is 'card'
    headerMode: 'none'
  }
);

export default RootStack;
