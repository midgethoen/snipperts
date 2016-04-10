import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../../redux/actions';
import SnippetFeed from './snippetfeed';
import SnippetInputBox from './snippetinputbox';
import { propEq, set, find, lensProp } from 'ramda';

const socket = require('socket.io-client');

const baseURL = typeof window === 'undefined' ? process.env.BASE_URL || (`http://localhost:8000`) : '';

class FeedView extends Component {

  constructor(props) {
    super(props);
    this.createSnippet = this.createSnippet.bind(this);
    this.socket = socket(baseURL);
    this.socket.on('sendSnippet', function (snippet) {
      props.dispatch(Actions.addSnippet(snippet));
    });
  }

  createSnippet(value) {
    if (value.trim()) {
      this.props.dispatch(
        Actions.createSnippet(value.trim())
      );
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <SnippetFeed snippets={this.props.snippets} />
        <SnippetInputBox
          onSubmit={this.createSnippet}
        />
      </div>
    );
  }
}

FeedView.need = [
  () => Actions.fetchSnippets(),
  () => Actions.fetchUsers(),
  () => Actions.fetchTopics(),
];
FeedView.propTypes = {
  dispatch: PropTypes.func.isRequired,
  snippets: PropTypes.arrayOf(PropTypes.object),
};

const userLens = lensProp('user');
const idEquals = propEq('_id');
function mapStateToProps({ snippets, users }) {
  return {
    snippets: snippets.map(snippet => {
      if (! find(idEquals(snippet.user), users)) {
        debugger;
      }
      return set(
        userLens,
        find(idEquals(snippet.user), users),
        snippet
      );
    }),
  };
}

export default connect(mapStateToProps)(FeedView);
