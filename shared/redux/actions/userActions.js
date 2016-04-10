import * as ActionTypes from '../constants';
import Config from '../../../server/config';
import fetch from 'isomorphic-fetch';

const baseURL = typeof window === 'undefined' ? process.env.BASE_URL || (`http://localhost:${Config.port}`) : '';

export function replaceUsers(users) {
  return {
    type: ActionTypes.REPLACE_USERS,
    users,
  };
}

export function fetchUsers() {
  return (dispatch) => {
    return fetch(`${baseURL}/api/users`, { credentials: 'same-origin' }).
      then((response) => response.json()).
      then((response) => dispatch(replaceUsers(response)));
  };
}
