import React, { Component } from 'react';
import { Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { employeesFetch, startLoading } from '../actions/EmployeeActions';
import { CardSection, Spinner } from '../components/common';
import EmployeeListItem from './EmployeeListItem';

class EmployeeList extends Component {
  componentWillMount() {
    this.props.startLoading();
    this.props.employeesFetch();
  }

  renderItem(employee) {
    return (
      <EmployeeListItem employee={employee.item} />
    );
  }

  render() {
    if (this.props.loading) {
      return (
        <Spinner />
      );
    } else if (this.props.employees.length === 0) {
      return (
        <CardSection style={{ justifyContent: 'center' }}>
          <Text>No Employees!</Text>
        </CardSection>
      );
    }
    return (
      <FlatList
        data={this.props.employees}
        renderItem={this.renderItem}
        keyExtractor={employee => employee.uid}
      />
    );
  }
}

const mapStateToProps = state => {
  // Convert object of objects to an array of objects
  const employees = _.map(state.employees, (value, key) => ({ ...value, uid: key }));
  return { employees, loading: state.createEmployeeForm.loading };
};

export default connect(mapStateToProps, { employeesFetch, startLoading })(EmployeeList);
