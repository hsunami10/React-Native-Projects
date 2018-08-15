import React, { Component } from 'react';
import { AsyncStorage, View, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { loginUser } from '../actions/AuthActions';

class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);

    this.getLoginInfo()
      .then(user => {
        if (user.email && user.password) {
          this.props.loginUser(user.email, user.password, this.props.navigation);
        } else {
          this.props.navigation.navigate('Auth');
        }
      })
      .catch(error => {
        console.log(`AuthLoadingScreen error: ${error}`);
      });
  }

  async getLoginInfo() {
    try {
      let email = '';
      let password = '';
      [email, password] = await Promise.all([
        AsyncStorage.getItem('manager_login_email'),
        AsyncStorage.getItem('manager_login_password')
      ]);
      return Promise.resolve({ email, password });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Authenticating...</Text>
        <ActivityIndicator />
      </View>
    );
  }
}

export default connect(null, { loginUser })(AuthLoadingScreen);
