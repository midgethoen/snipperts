import React, { PropTypes } from 'react';

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
      <div>
        <button onClick={this.click}>send</button>
      </div>
    );
  }
}

SnippetInputBox.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  snippets: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      user: PropTypes.object.isRequired,
    })
  ),
};

export default SnippetInputBox;
