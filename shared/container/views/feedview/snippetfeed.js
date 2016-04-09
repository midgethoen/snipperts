import React, { PropTypes, Component } from 'react';
import Snippet from './snippet';

function SnippetFeed({ snippets}) {
  return (
    <div>
    {
      // XXX: needs to be grouped by user/time
      snippets.map(snippet => <Snippet snippet={snippet} /> )
    }
    </div>
  );
}

SnippetFeed.propTypes = {
  snippets: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      user: PropTypes.user.isRequired,
    })
  ),
};

export default SnippetFeed;
