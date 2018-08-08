import {
  CREATE_EMPLOYEE_UPDATE
} from './types';

export const createEmployeeUpdate = (prop, value) => {
  return {
    type: CREATE_EMPLOYEE_UPDATE,
    payload: { prop, value }
  };
};
