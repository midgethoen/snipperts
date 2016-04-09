import * as ActionTypes from '../constants';

const initialState = [];

const snippetReducer = (state = initialState, action) => {
  const { type, snippet, snippets } = action;
  switch (type) {
    case ActionTypes.ADD_SNIPPET :
      return [
        ...state,
        {
          user: snippet.userId,
          text: snippet.text,
          description: snippet.description,
          topics: snippet.topics,
          _id: snippet._id,
        },
      ];

    case ActionTypes.UPDATE_SNIPPET :
      return state.map((s) => {
        if (s._id === snippet._id) {
          return snippet;
        }
        return s;
      });

    case ActionTypes.DELETE_SNIPPET :
      return state.filter((s) => s._id !== snippet._id);

    case ActionTypes.REPLACE_SNIPPETS :
      return snippets;

    case ActionTypes.CHANGE_SELECTED_SNIPPET :
      return state.map((s) => {
        if (s._id === snippet._id) {
          return { ...snippet, editing: !snippet.editing };
        }
        return s;
      });

    default:
      return state;
  }
};

export default snippetReducer;
