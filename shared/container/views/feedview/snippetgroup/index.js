import React, { PropTypes } from 'react';
import relativeDate from 'relative-date';

function Snippet({ snippets }) {
  const [snippet] = snippets;
  return (
    <article className="row">
      <figure className="col-xs-3 col-md-2">
        <a href={snippet.user.username}>
          <img src={snippet.user.pictureUrl} />
        </a>
      </figure>
      <div className="col-xs-9 col-md-10">
        <div className="message">
          <ul>
            {snippets.map(s => <li data-squad={s.squad}>{s.text}</li>)}
          </ul>
          <div className="byline"><a href={snippet.user.username} rel="author">{snippet.user.fullName}</a> | <time>{relativeDate(new Date(snippet.updatedAt))}</time></div>
        </div>
      </div>
    </article>
  );
}

Snippet.propTypes = {
  snippets: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      user: PropTypes.object.isRequired,
    })
  ),
};

export default Snippet;
