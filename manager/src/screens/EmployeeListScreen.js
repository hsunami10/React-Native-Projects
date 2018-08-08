import React, { Component } from 'react';
import EmployeeList from '../components/EmployeeList';

class EmployeeListScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: `${navigation.getParam('email', '')}'s Employees`,
      headerStyle: {
        backgroundColor: '#fff'
      },
      headerTintColor: '#85aaf5',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerLeft: null // Remove default back button
    };
  };

  render() {
    return <EmployeeList />;
  }
}

export { EmployeeListScreen };
