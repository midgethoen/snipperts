import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import TextareaTag from './TextareaTag';

class SnippetInputBox extends Component {

  constructor(props) {
    super(props);
    this.cleanupMentions = this.cleanupMentions.bind(this);
  }

  cleanupMentions(rawtext) {
    /*
      The mentionsinput uses a weir format, but we want to send just the tex back to the backend.
      '@bla stuff #thinks' instead of '@[bla][user:234] stuff .. etc'
      so we just parse and change it for now ...
     */
    let match;
    let text = rawtext;
    const typeMap = { user: '@', topic: '#' };
    const re = /[@#]\[([\w-_]+)\]\(([^:]+)[^\)]*\)/g;
    while (match = re.exec(rawtext)) { //eslint-disable-line
      const [fullMatch, tag, type] = match;
      text = text.replace(fullMatch, `${typeMap[type]}${tag}`);
    }
    this.props.onSubmit(text);
  }

  render() {
    return (
      <div className="snippet-input">
        <div className="row">
          <TextareaTag
            mentions={this.props.mentions}
            tags={this.props.topics}
            onSubmit={this.cleanupMentions}
          />
        </div>
      </div>
    );
  }
}

SnippetInputBox.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  mentions: PropTypes.arrayOf(PropTypes.string),
  topics: PropTypes.arrayOf(PropTypes.string),
};

function mapStateToProps({ users, topics }) {
  return {
    mentions: users.map(u => ({
      id: u._id,
      display: u.username,
      name: u.name,
      pictureUrl: u.pictureUrl,
    })),
    topics: topics.map(t => ({
      id: t._id,
      display: t.tag,
    })),
  };
}

export default connect(mapStateToProps)(SnippetInputBox);
