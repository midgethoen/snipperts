import * as ActionTypes from '../constants';
import Config from '../../../server/config';
import fetch from 'isomorphic-fetch';

const baseURL = typeof window === 'undefined' ? process.env.BASE_URL || (`http://localhost:${Config.port}`) : '';

export function addSnippet(snippet) {
  return {
    type: ActionTypes.ADD_SNIPPET,
    snippet,
  };
}

export function changeSelectedSnippet(snippetId) {
  return {
    type: ActionTypes.CHANGE_SELECTED_SNIPPET,
    snippetId,
  };
}

export function createSnippet(text) {
  return () => {
    fetch(`${baseURL}/api/snippets`, {
      method: 'post',
      body: JSON.stringify({ text }),
      credentials: 'same-origin',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    });
  };
}

export function deleteSnippet(snippet) {
  return {
    type: ActionTypes.DELETE_SNIPPET,
    snippet,
  };
}

export function replaceSnippets(snippets) {
  return {
    type: ActionTypes.REPLACE_SNIPPETS,
    snippets,
  };
}

export function fetchSnippets() {
  return (dispatch) => {
    return fetch(`${baseURL}/api/snippets`, { credentials: 'same-origin' }).
      then((response) => response.json()).
      then((response) => dispatch(replaceSnippets(response)));
  };
}

export function deleteSnippetRequest(snippet) {
  return (dispatch) => {
    fetch(`${baseURL}/api/snippet/${snippet._id}`, {
      method: 'delete',
      body: JSON.stringify({
        snippetId: snippet._id,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }).then(() => dispatch(deleteSnippet(snippet)));
  };
}
