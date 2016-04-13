import React, { PropTypes } from 'react';
import SnippetGroup from './snippetgroup';
import { groupWith } from 'ramda';

function SnippetFeed({ snippets }) {
  return (
    <section className="row feed">
      <div className="col-md-9 col-md-offset-3 col-lg-6">
        {
          groupWith(
            (s1, s2) =>
              s1.user === s2.user &&
              new Date(s1.createdAt).getDate() === new Date(s2.createdAt).getDate(),
            snippets)
            .map(
              snippetGroup => <SnippetGroup snippets={snippetGroup} />
            )
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
