import { createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import React from 'react';
import { View, Text, Button } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  LoginScreen,
  EmployeeListScreen,
  CreateEmployeeModal,
  FadeScreen2,
  BottomScreen3
} from './screens';
import { SearchHeader } from './components/common';

import AuthLoadingScreen from './screens/AuthLoadingScreen';

// NOTE: Make more nested stack navigators
// So there's a card / modal animation when going from Auth to App (fading right now)
/*
NOTE: Layout for comment above
Stack (
  AuthLoadingScreen,
  RootStack (
    AuthStack (
      Welcome,
      SignUp,
      LogIn
    ),
    AppStack (
      AppMainStack (
        EmployeeList,
        SLIDE / CARD TRANSITION
      ),
      AppModalStack (
        CreateEmployeeModal
      ),
      MODAL TRANSITION
    )
    SLIDE / CARD TRANSITION
  )
  FADE TRANSITION
)
*/

// NOTE: Custom fade in/out transition
/*
Index - index of screen transitioning to
sceneRange
  - start at index - 1 (scene before one we're switching to)
  - end at index (scene we're switching to
outputOpacity
  - 0 (invisible) to 1 (opaque)
*/
const FadeTransition = (index, position) => {
  const sceneRange = [index - 1, index];
  const outputOpacity = [0, 1];
  const transition = position.interpolate({
    inputRange: sceneRange,
    outputRange: outputOpacity
  });

  // Determine which property to animate
  return {
    opacity: transition
  };
};

// NOTE: Custom bottom transition
const BottomTransition = (index, position, height) => {
  const sceneRange = [index - 1, index];
  const outputHeight = [height, 0]; // Bottom to top of screen
  const transition = position.interpolate({
    inputRange: sceneRange,
    outputRange: outputHeight
  });

  return {
    transform: [{ translateY: transition }]
  };
};

const NavigationConfig = () => {
  return {
    screenInterpolator: sceneProps => {
      const { scene, position, /*layout*/ } = sceneProps;
      const index = scene.index;
      // const height = layout.initHeight;

      return FadeTransition(index, position);
      // return BottomTransition(index, position, height);
    }
  };
};

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

When the screen renders, it looks at 'RootStack' from top to bottom. Then it sees
'initialRouteName', and renders that component first. The default 'card' mode in
MainStack works because you're already inside of it, since 'Home' is rendered.
Rendering the CreateEmployeeModal gives a modal transition because you're IN the
RootStack. Now, if you go from 'CreateModal' to another modal in the ModalStack, then
it would follow whatever rule is in the modal stack navigator.
Whatever mode is in RootStack, that is the mode that will be followed when navigating
between whatever is listed in the route configurations, so BETWEEN the two stack navigators.
*/

// Stack to hold all main screens
const MainStack = createStackNavigator(
  {
    EmployeeList: {
      screen: EmployeeListScreen
    }
  },
  {
    initialRouteName: 'EmployeeList',
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

// ========================== NOTE: Example tab stack ==========================
const HomeScreen = ({ navigation }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Home!</Text>
    <Button
      title="Fade to Two"
      color="pink"
      onPress={() => navigation.navigate('Fade2')}
    />
  </View>
);

const SettingsScreen = ({ navigation }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Settings!</Text>
    <Button
      title="Fade to Three"
      color="purple"
      onPress={() => navigation.navigate('Bottom3')}
    />
  </View>
);

const TabStack = createMaterialTopTabNavigator(
  {
    Home: HomeScreen,
    Settings: SettingsScreen
  },
  {
    initialRouteName: 'Home',
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
);
// ========================== NOTE: Example ends here ==========================

// Stack to hold all fade transitions
const FadeStack = createStackNavigator(
  {
    Fade1: TabStack,
    Fade2: FadeScreen2,
    Bottom3: BottomScreen3
  },
  {
    initialRouteName: 'Fade1',
    headerMode: 'none',
    transitionConfig: NavigationConfig
  }
);

// Stack to hold all modals
const AppModalStack = createStackNavigator(
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

// Combined stack to hold App and Fade screens (because different transitions)
// NOTE: This header stays on top no matter what screen it's on
const AppMainStack = createStackNavigator(
  {
    AppMain: MainStack,
    Fade: FadeStack
  },
  {
    initialRouteName: 'AppMain',
    navigationOptions: {
      header: (
        <SearchHeader />
      )
    }
  }
);

// Looks at route configurations top to bottom
// If you swap "Main" and "Modals", it would show modals first
const AppStack = createStackNavigator(
  {
    Main: AppMainStack,
    Modals: AppModalStack
  },
  {
    mode: 'modal', // default is 'card'
    headerMode: 'none',
    initialRouteName: 'Main'
  }
);

const AuthStack = createStackNavigator(
  {
    LogIn: LoginScreen
  },
  {
    initialRouteName: 'LogIn',
  }
);

// Navigating from auth screens to app screens needs card transition
const RootStack = createStackNavigator(
  {
    Auth: AuthStack,
    App: AppStack
  },
  {
    headerMode: 'none'
  }
);


export default createStackNavigator(
  {
    AuthLoading: AuthLoadingScreen, // or splash screen?
    RootStack
  },
  {
    headerMode: 'none',
    transitionConfig: NavigationConfig
  }
);
