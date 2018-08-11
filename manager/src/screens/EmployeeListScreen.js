import React, { Component } from 'react';
import { Button } from 'react-native';
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
      headerLeft: null, // Remove default back button
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

  constructor(props) {
    super(props);

    this.addEmployee = this.addEmployee.bind(this);
  }

  componentWillMount() {
    this.props.navigation.setParams({ addEmployee: this.addEmployee });
  }

  addEmployee() {
    this.props.navigation.navigate('CreateModal');
  }

  render() {
    return <EmployeeList />;
  }
}

export { EmployeeListScreen };
