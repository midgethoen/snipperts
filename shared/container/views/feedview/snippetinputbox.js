import React, { PropTypes } from 'react';

function SnippetInputBox() {
  return (
    <div>
      IMPLEMENT MEEE :(())
    </div>
  );
}

SnippetInputBox.propTypes = {
  snippets: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      user: PropTypes.object.isRequired,
    })
  ),
};

export default SnippetInputBox;
