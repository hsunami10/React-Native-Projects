import {
  CREATE_EMPLOYEE_UPDATE,
  CREATE_NEW_EMPLOYEE,
  START_LOADING,
  EMPLOYEES_FETCH_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  name: '',
  phone: '',
  shift: '',
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_EMPLOYEE_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case CREATE_NEW_EMPLOYEE:
      return { ...state, ...INITIAL_STATE };
    case START_LOADING:
      return { ...state, loading: true };
    case EMPLOYEES_FETCH_SUCCESS:
      return { ...state, loading: false };
    default:
      return state;
  }
};
