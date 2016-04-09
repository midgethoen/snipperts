import * as ActionTypes from '../constants';
import Config from '../../../server/config';
import fetch from 'isomorphic-fetch';

const baseURL = typeof window === 'undefined' ? process.env.BASE_URL || (`http://localhost:${Config.port}`) : '';

export function addSnippet(snippet) {
  return {
    type: ActionTypes.ADD_SNIPPET,
    snippet: {
      user: snippet.userId,
      text: snippet.text,
      description: snippet.description,
      topics: snippet.topics,
      _id: snippet._id,
    },
  };
}

export function changeSelectedSnippet(snippetId) {
  return {
    type: ActionTypes.CHANGE_SELECTED_SNIPPET,
    snippetId,
  };
}

export function addSnippetRequest(snippet) {
  return (dispatch) => {
    fetch(`${baseURL}/api/snippet`, {
      method: 'post',
      body: JSON.stringify({
        snippet: {
          text: snippet.text,
        },
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }).then((res) => res.json()).then(res => dispatch(addSnippet(res.snippet)));
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
    type: ActionTypes.ADD_SNIPPETS,
    snippets,
  };
}

export function fetchSnippets() {
  return (dispatch) => {
    return fetch(`${baseURL}/api/snippets`).
      then((response) => response.json()).
      then((response) => dispatch(replaceSnippets(response.snippets)));
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
