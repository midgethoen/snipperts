import React, { PropTypes, Component } from 'react';

function Snippet({ snippet }) {
  return (
    <pre>
    {
      JSON.stringify(snippet, null, 2)
    }
    </pre>
  );
}

Snippet.propTypes = {
  snippet: PropTypes.shape({
    text: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
  }),
};

export default Snippet;
