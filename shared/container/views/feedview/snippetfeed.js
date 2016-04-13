import React, { PropTypes } from 'react';
import SnippetGroup from './snippetgroup';
import { splitWhen } from 'ramda';

function snippetDayOrUserChanged() {
  let day;
  let user;
  return function checkIfDayOrUserChanged(snippet) {
    if (
      day !== undefined && user !== undefined &&
      day === new Date(snippet.createdAt).getDate() &&
      user === snippet.user
    ) {
      return true;
    }
    day = new Date(snippet.createdAt).getDate();
    user = snippet.user;
    return false;
  };
}

function SnippetFeed({ snippets }) {
  return (
    <section className="row feed">
      <div className="col-md-9 col-md-offset-3 col-lg-6">
        {
          splitWhen(snippetDayOrUserChanged(), snippets)
            .map(snippetGroup => <SnippetGroup snippets={snippetGroup} />)
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
