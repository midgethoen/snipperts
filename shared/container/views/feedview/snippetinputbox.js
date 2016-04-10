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
          <div className="col-lg-6 col-lg-offset-3">
            <div className="row">
              <div className="col-lg-10 col-lg-offset-2">
                  <TextareaTag
                    mentions={this.props.mentions}
                    tags={this.props.topics}
                    onSubmit={this.props.onSubmit}
                  />
              </div>
            </div>
          </div>
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
    mentions: [{id:123, display: "koek"}],
    topics: [{id:123, display: "koek"}],
  };
}

export default connect(mapStateToProps)(SnippetInputBox);
