import * as ActionTypes from '../constants';

const initialState = { snippets: [], snippet: null };

const snippetReducer = (state = initialState, action) => {
  const { type, snippet, snippets } = action;
  switch (type) {
    case ActionTypes.ADD_SNIPPET :
      return {
        snippets: [{
          user: snippet.userId,
          text: snippet.text,
          description: snippet.description,
          topics: snippet.topics,
          _id: snippet._id,
        }, ...state.snippets],
        snippet: state.snippet,
      };

    case ActionTypes.UPDATE_SNIPPET :
      return {
        snippets: state.snippets.map((s) => {
          if (s._id === snippet._id) {
            return {
              ...snippet,
            };
          }
          return s;
        }),
        snippet: state.snippet,
      };

    case ActionTypes.DELETE_SNIPPET :
      return {
        snippets: state.snippets.filter((s) => s._id !== snippet._id),
        snippet: state.snippet,
      };

    case ActionTypes.REPLACE_SNIPPETS :
      return {
        snippets,
        snippet: state.snippet,
      };

    case ActionTypes.CHANGE_SELECTED_SNIPPET :
      return {
        snippets: state.snippets,
        snippet: snippets.snippet,
      };

    default:
      return state;
  }
};

export default snippetReducer;
