import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Picker, Text } from 'react-native';
import { Card, CardSection, Input, Button } from './common';
import { createEmployeeUpdate } from '../actions/EmployeeActions';

class EmployeeCreateForm extends Component {
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
          <Button>
            Create
          </Button>
        </CardSection>
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
  const { name, phone, shift } = state.createEmployeeForm;
  return { name, phone, shift };
};

export default connect(mapStateToProps, { createEmployeeUpdate })(EmployeeCreateForm);
