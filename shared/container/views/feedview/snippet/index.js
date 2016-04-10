import React, { PropTypes } from 'react';

function Snippet({ snippet }) {
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
            <li data-squad={snippet.squad}>{snippet.text}</li>
          </ul>
          <div className="byline"><a href={snippet.user.username} rel="author">{snippet.user.name}</a> | <time>{snippet.updated_at}</time></div>
        </div>
      </div>
    </article>
  );
}

Snippet.propTypes = {
  snippet: PropTypes.shape({
    text: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
  }),
};

export default Snippet;
