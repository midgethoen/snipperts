import React, { PropTypes } from 'react';
import Snippet from './snippet';

function SnippetFeed({ snippets }) {
  return (
    <section className="row feed">
      <div className="col-md-9 col-md-offset-3 col-lg-6">
        {
          // XXX: needs to be grouped by user/time
          snippets.map(snippet => <Snippet snippet={snippet} />)
        }
      </div>
    </section>
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
