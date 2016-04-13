import React, { Component } from 'react';
import { Mention, MentionsInput } from 'react-mentions';

export default class TextareaTag extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }
  handleChange(e, value) {
    this.setState({
      value,
    });
  }
  handleRemove() {
    // console.log('removed a mention', arguments);
  }
  handleAdd() {
    // console.log('added a new mention', arguments);
  }

  handleKeyDown(e) {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      this.props.onSubmit(this.state.value);
      this.setState({ value: '' });
    }
    return true;
  }

  displayTransform(_, display, type) {
    if (type === 'user') {
      return `@${display}`;
    }
    return `#${display}`;
  }

  renderUserSuggestion(suggestion) {
    return (
      <div className="user">
        <img className="user_picture" src={suggestion.pictureUrl} />
        <span className="user_display">{suggestion.display}</span>
        <span className="user_divider"></span>
        <span className="user_name">{suggestion.name}</span>
      </div>
    );
  }

  renderTopicSuggestion(suggestion) {
    return (
      <div className="topi">
        {suggestion.display}
      </div>
    );
  }

  render() {
    return (
      <div className="col-lg-6 col-lg-offset-3">
        <div className="row">
          <div className="col-lg-10 col-lg-offset-2">
            <div className="multiple-triggers">
              <MentionsInput
                onKeyDown={this.handleKeyDown}
                value={this.state.value}
                onChange={this.handleChange}
                markup="@[__display__](__type__:__id__)"
                className="mentionsinput"
                placeholder={'Mention people using "@" and tag projects using "#"'}
                displayTransform={this.displayTransform}
              >
                <Mention
                  type="user"
                  trigger="@"
                  data={this.props.mentions}
                  renderSuggestion={this.renderUserSuggestion}
                  onAdd={this.handleAdd}
                  className="mentions"
                  onRemove={this.handleRemove}
                />
                <Mention
                  type="topic"
                  trigger="#"
                  className="topics"
                  data={this.props.tags}
                  renderSuggestion={this.renderTopicSuggestion}
                />
              </MentionsInput>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


TextareaTag.propTypes = {
  mentions: React.PropTypes.array.isRequired,
  tags: React.PropTypes.array.isRequired,
  onSubmit: React.PropTypes.func.isRequired,
};
