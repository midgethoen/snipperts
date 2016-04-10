import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../../redux/actions';
import SnippetFeed from './snippetfeed';
import SnippetInputBox from './snippetinputbox';
const socket = require('socket.io-client');

class FeedView extends Component {

  constructor(props) {
    super(props);
    this.createSnippet = this.createSnippet.bind(this);
    this.socket = socket('http://localhost:8000');
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
    // <SnippetFeed snippets={this.props.snippets} />
    return (
      <div className="container-fluid">
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


function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(FeedView);
