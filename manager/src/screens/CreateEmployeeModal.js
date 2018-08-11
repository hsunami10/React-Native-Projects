import React, { Component } from 'react';
import { HeaderBackButton } from 'react-navigation';
import EmployeeCreateForm from '../components/EmployeeCreateForm';

class CreateEmployeeModal extends Component {
  static navigationOptions = ({ navigation }) => {
    // popToTop because you will never have multiple modals open
    return {
      title: 'Create Employee',
      headerLeft: (
        <HeaderBackButton onPress={() => navigation.popToTop()} />
      )
    };
  }
  render() {
    return <EmployeeCreateForm navigation={this.props.navigation} />;
  }
}

export { CreateEmployeeModal };
