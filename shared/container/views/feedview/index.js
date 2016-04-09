import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../../redux/actions';
import SnippetFeed from './snippetfeed';
import SnippetInputBox from './snippetinputbox';

console.log(SnippetInputBox);

function FeedView(props) {
  return (
    <div>
    </div>
  );
  // <SnippetFeed snippets={props.snippets} />
  // <SnippetInputBox />
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


function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(FeedView);
