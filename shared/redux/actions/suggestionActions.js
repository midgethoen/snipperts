import * as ActionTypes from '../constants';
import Config from '../../../server/config';
import fetch from 'isomorphic-fetch';

const baseURL = typeof window === 'undefined' ? process.env.BASE_URL || (`http://localhost:${Config.port}`) : '';

export function replaceSuggestions(suggestions) {
  return {
    type: ActionTypes.REPLACE_SUGGESTIONS,
    suggestions,
  };
}

export function fetchSuggestions() {
  return (dispatch) => {
    return fetch(`${baseURL}/api/suggestions`).
      then((response) => response.json()).
      then((response) => dispatch(replaceSuggestions(response)));
  };
}
