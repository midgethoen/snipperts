import * as ActionTypes from '../constants';
import Config from '../../../server/config';
import fetch from 'isomorphic-fetch';

const baseURL = typeof window === 'undefined' ? process.env.BASE_URL || (`http://localhost:${Config.port}`) : '';

export function replaceTopics(topics) {
  return {
    type: ActionTypes.REPLACE_TOPICS,
    topics,
  };
}

export function fetchTopics() {
  return (dispatch) => {
    return fetch(`${baseURL}/api/topics`, { credentials: 'same-origin' }).
      then((response) => response.json()).
      then((response) => dispatch(replaceTopics(response)));
  };
}
