import React, { Component } from 'react';
import { View, Text } from 'react-native';
import EmployeeCreateForm from '../components/EmployeeCreateForm';

class EmployeeCreateScreen extends Component {
  static navigationOptions = () => {
    return {
      title: 'Create Employee'
    };
  };

  render() {
    return (
      <EmployeeCreateForm />
    );
  }
}

export { EmployeeCreateScreen };
