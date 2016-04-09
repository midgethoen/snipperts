import * as ActionTypes from '../constants';

const initialState = { suggestions: [] };

const suggestionReducer = (state = initialState, action) => {
  const { type, suggestions } = action;
  switch (type) {
    case ActionTypes.REPLACE_SUGGESTIONS :
      return {
        suggestions,
      };

    default:
      return state;
  }
};

export default suggestionReducer;
