import React, { Component } from 'react';
import { Mention, MentionsInput } from 'react-mentions';
import defaultStyle from './defaultStyle';
import defaultMentionStyle from './defaultMentionStyle';


export default class TextareaTag extends Component {
  constructor(props) {
    super(props);
    this.value = '';
  }
  handleChange(value) {
    this.setState({
      value,
    });
  }
  handleRemove() {
    console.log('removed a mention', arguments);
  }
  handleAdd() {
    console.log('added a new mention', arguments);
  }
  handleKeyDown(e) {
    if (e.keyCode === 13 && !e.shiftKey) {
      console.log('IMPLEMENT SUBMIT FUNCTION');
    }
    return true;
  }
  renderSuggestion(suggestion, search, highlightedDisplay) {
    return (
      <div className="user">
        { highlightedDisplay }
      </div>
    );
  }
  render() {
    return (
      <div className="multiple-triggers">
        <MentionsInput
          onKeyDown={this.submit}
          value={this.state.value}
          onChange={this.handleChange}
          markup="@[__display__](__type__:__id__)"
          style={ defaultStyle() }
          placeholder={'Mention people using "@" and tag projects using "#"'}
        >

          <Mention
            type="user"
            trigger="@"
            data={this.props.mentions}
            renderSuggestion={this.renderSuggestion}
            onAdd={this.handleAdd}
            onRemove={this.handleRemove}
            style={defaultMentionStyle}
          />
          <Mention
            type="topic"
            trigger="#"
            data={this.props.tags}
            renderSuggestion={this.renderSuggestion}
            style={defaultMentionStyle}
          />
        </MentionsInput>
      </div>
    );
  }
}

TextareaTag.propTypes = {
  mentions: React.PropTypes.array.isRequired,
  tags: React.PropTypes.array.isRequired,
};
