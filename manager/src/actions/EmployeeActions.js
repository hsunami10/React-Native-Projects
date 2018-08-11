import firebase from 'firebase';
import {
  CREATE_EMPLOYEE_UPDATE,
  CREATE_NEW_EMPLOYEE,
  EMPLOYEES_FETCH_SUCCESS,
  START_LOADING
} from './types';

export const createEmployeeUpdate = (prop, value) => {
  return {
    type: CREATE_EMPLOYEE_UPDATE,
    payload: { prop, value }
  };
};

export const createNewEmployee = (navigation, fieldsObj) => {
  const user = firebase.auth().currentUser;

  return dispatch => {
    firebase.database().ref(`/users/${user.uid}/employees`)
      .push(fieldsObj)
      .then(() => {
        navigation.popToTop();
        dispatch({ type: CREATE_NEW_EMPLOYEE });
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const employeesFetch = () => {
  const user = firebase.auth().currentUser;
  return dispatch => {
    firebase.database().ref(`/users/${user.uid}/employees`)
      .on('value', snapshot => {
        dispatch({
          type: EMPLOYEES_FETCH_SUCCESS,
          payload: snapshot.val()
        });
      });
  };
};

export const startLoading = () => {
  return { type: START_LOADING };
};
