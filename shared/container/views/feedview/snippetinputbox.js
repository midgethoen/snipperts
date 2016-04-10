import React, { PropTypes, Component } from 'react';

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
                <form>
                  <textarea className="form-control">I worked on</textarea>
                  <button onClick={this.click}>send</button>
                </form>
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
  snippets: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      user: PropTypes.object.isRequired,
    })
  ),
};

export default SnippetInputBox;
