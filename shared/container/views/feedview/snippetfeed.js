import React, { PropTypes } from 'react';
import Snippet from './snippet';

function SnippetFeed({ snippets }) {
  return (
    <div>
    {
      // XXX: needs to be grouped by user/time
      snippets.map(snippet => <Snippet snippet={snippet} />)
    }
    </div>
  );
}

SnippetFeed.propTypes = {
  snippets: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      user: PropTypes.object.isRequired,
    })
  ),
};

export default SnippetFeed;
