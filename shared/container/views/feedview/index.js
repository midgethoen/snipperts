import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../redux/actions';
import SnippetFeed from './snippetfeed';
import SnippetInputBox from './snippetinputbox';

function FeedView(props) {
  return (
    <div>
      <SnippetFeed snippets={props.snippets} />
      <SnippetInputBox />
    </div>
  );
}

FeedView.need = [
  () => Actions.fetchSnippets(),
  () => Actions.fetchUsers(),
  () => Actions.fetchTopics(),
];
FeedView.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(FeedView);
