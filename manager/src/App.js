import React, { Component } from 'react';
import { Platform } from 'react-native';
import { Provider } from 'react-redux';
import { SafeAreaView } from 'react-navigation';
import { isIphoneX } from 'react-native-iphone-x-helper';
import firebase from 'firebase';
import RootStack from './RootStack';
import store from '../index';

class App extends Component {
  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyDFNDnD_Iq4V0bmKEpAL4AZN7-6JD7Wf9w',
      authDomain: 'manager-e4ee1.firebaseapp.com',
      databaseURL: 'https://manager-e4ee1.firebaseio.com',
      projectId: 'manager-e4ee1',
      storageBucket: 'manager-e4ee1.appspot.com',
      messagingSenderId: '886965516932'
    };
    firebase.initializeApp(config);
    console.log(Platform.OS); // 'ios', 'android'
  }

  render() {
    if (isIphoneX()) {
      return (
        <SafeAreaView style={{ flex: 1 }}>
          <Provider store={store}>
            <RootStack />
          </Provider>
        </SafeAreaView>
      );
    }
    return (
      <Provider store={store}>
        <RootStack />
      </Provider>
    );
  }
}

export default App;
