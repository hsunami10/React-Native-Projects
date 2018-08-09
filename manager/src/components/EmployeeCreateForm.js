import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Picker, Text, Alert } from 'react-native';
import { Card, CardSection, Input, Button, FullScreenSpinner } from './common';
import {
  createEmployeeUpdate,
  createNewEmployee,
  startLoading
} from '../actions/EmployeeActions';

class EmployeeCreateForm extends Component {
  onButtonPress() {
    const { navigation, name, phone, shift } = this.props;
    if (name.trim() && phone.trim()) {
      this.props.startLoading();
      this.props.createNewEmployee(navigation, { name, phone, shift: shift || 'Thursday' });
    } else {
      Alert.alert(
        'Oops!',
        'You have submitted invalid inputs',
        [
          { text: 'Cancel', onPress: null, style: 'cancel' },
          { text: 'Ok', onPress: null }
        ]
      );
    }
  }

  renderLoading() {
    if (this.props.loading) {
      return (
        <FullScreenSpinner />
      );
    }
    return null;
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label="Name"
            placeholder="John Doe"
            value={this.props.name}
            onChangeText={text => this.props.createEmployeeUpdate('name', text)}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Phone"
            placeholder="1234567890"
            value={this.props.phone}
            onChangeText={text => this.props.createEmployeeUpdate('phone', text)}
          />
        </CardSection>

        <CardSection style={{ flexDirection: 'column' }}>
          <Text style={styles.pickerLabelStyle}>Shift</Text>
          <Picker
            selectedValue={this.props.shift === '' ? 'Thursday' : this.props.shift}
            onValueChange={day => this.props.createEmployeeUpdate('shift', day)}
          >
            <Picker.Item label="Monday" value="Monday" />
            <Picker.Item label="Tuesday" value="Tuesday" />
            <Picker.Item label="Wednesday" value="Wednesday" />
            <Picker.Item label="Thursday" value="Thursday" />
            <Picker.Item label="Friday" value="Friday" />
            <Picker.Item label="Saturday" value="Saturday" />
            <Picker.Item label="Sunday" value="Sunday" />
          </Picker>
        </CardSection>

        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Create
          </Button>
        </CardSection>

        {this.renderLoading()}
      </Card>
    );
  }
}

const styles = {
  pickerLabelStyle: {
    fontSize: 18,
    paddingLeft: 20
  }
};

const mapStateToProps = state => {
  const { name, phone, shift, loading } = state.createEmployeeForm;
  return { name, phone, shift, loading };
};

export default connect(mapStateToProps, {
  createEmployeeUpdate,
  createNewEmployee,
  startLoading
})(EmployeeCreateForm);
