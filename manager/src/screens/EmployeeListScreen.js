import React, { Component } from 'react';
import { Button, AsyncStorage } from 'react-native';
import EmployeeList from '../components/EmployeeList';

class EmployeeListScreen extends Component {
  static navigationOptions = ({ navigation }) => { // Override default navigationOptions
    return {
      title: `${navigation.getParam('email', '')}'s List`,
      headerStyle: {
        backgroundColor: '#fff'
      },
      headerTintColor: '#85aaf5',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerLeft: (
        <Button
          onPress={navigation.getParam('logOut')}
          title="Log Out"
          color="#85aaf5"
        />
      ),
      headerRight: (
        <Button
          onPress={navigation.getParam('addEmployee')}
          title="Add"
          color="#85aaf5"
        />
      ),
      headerBackTitle: null // Remove back title for NEXT screen
    };
  };

  componentWillMount() {
    this.props.navigation.setParams({
      addEmployee: this.addEmployee.bind(this),
      logOut: this.logOut.bind(this)
    });
  }

  addEmployee() {
    this.props.navigation.navigate('CreateModal');
  }

  async logOut() {
    try {
      await Promise.all([
        AsyncStorage.removeItem('manager_login_email'),
        AsyncStorage.removeItem('manager_login_password')
      ]);
      this.props.navigation.navigate('Auth');
    } catch (error) {
      console.log(`EmployeeListScreen error: ${error}`);
    }
  }

  render() {
    return <EmployeeList />;
  }
}

export { EmployeeListScreen };
