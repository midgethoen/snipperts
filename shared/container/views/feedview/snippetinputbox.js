import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import TextareaTag from './TextareaTag';

class SnippetInputBox extends Component {

  constructor(props) {
    super(props);
    this.click = this.click.bind(this);
  }

  click() {
    this.setState({ text: (new Date).toString() });
    this.props.onSubmit();
  }

  render() {
    return (
      <div className="snippet-input">
        <div className="row">
          <TextareaTag
            mentions={this.props.mentions}
            tags={this.props.topics}
            onSubmit={this.props.onSubmit}
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

function mapStateToProps(state) {
  return {
    mentions: [
      {id:123, display: "albert", name: "Albert Jongeren", pictureUrl: "https://lh3.googleusercontent.com/-MTFn1U2W0vU/AAAAAAAAAAI/AAAAAAAAYvE/aC_JBrSQqPo/s120-c/photo.jpg"},
      {id:124, display: "piet", name: "Piet Jongeren", pictureUrl: "https://lh3.googleusercontent.com/-MTFn1U2W0vU/AAAAAAAAAAI/AAAAAAAAYvE/aC_JBrSQqPo/s120-c/photo.jpg"},
      {id:125, display: "hans", name: "Hans Grietje", pictureUrl: "https://lh3.googleusercontent.com/-MTFn1U2W0vU/AAAAAAAAAAI/AAAAAAAAYvE/aC_JBrSQqPo/s120-c/photo.jpg"},
      {id:126, display: "grietje", name: "Grietje Hans", pictureUrl: "https://lh3.googleusercontent.com/-MTFn1U2W0vU/AAAAAAAAAAI/AAAAAAAAYvE/aC_JBrSQqPo/s120-c/photo.jpg"}],
    topics: [
      {id:234, display: "koek"},
      {id:23434, display: "koekaasdf"}
    ],
  };
}

export default connect(mapStateToProps)(SnippetInputBox);
