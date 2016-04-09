import * as ActionTypes from '../constants';

const initialState = { users: [] };

const userReducer = (state = initialState, action) => {
  const { type, users } = action;
  switch (type) {
    case ActionTypes.REPLACE_USERS :
      return { users };

    default:
      return state;
  }
};

export default userReducer;
