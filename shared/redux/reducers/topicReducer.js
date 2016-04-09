import * as ActionTypes from '../constants';

const initialState = { topics: [] };

const topicReducer = (state = initialState, action) => {
  const { type, topics } = action;
  switch (type) {
    case ActionTypes.REPLACE_TOPICS :
      return { topics };

    default:
      return state;
  }
};

export default topicReducer;
