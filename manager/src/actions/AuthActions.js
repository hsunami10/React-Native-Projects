import firebase from 'firebase';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER
} from './types';

export const emailChanged = text => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = text => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

/*
NOTE: Any error that happens inside of .then() - syntax error, etc.,
firebase sees it as something went wrong with the REQUEST, so it
executes the catch statement.
*/
export const loginUser = (email, password, navigation) => {
  return dispatch => {
    dispatch({ type: LOGIN_USER });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(obj => loginUserSuccess(dispatch, obj.user, password, navigation))
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(obj => loginUserSuccess(dispatch, obj.user, password, navigation))
          .catch(() => loginUserFail(dispatch));
        });
    };
};

const loginUserFail = dispatch => {
  dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSuccess = (dispatch, user, password, navigation) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: {
      ...user,
      password
    }
  });

  navigation.navigate('EmployeeList', { email: user.email });
};
