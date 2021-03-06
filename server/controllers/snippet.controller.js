import Snippet from '../models/snippet';
import cuid from 'cuid';
import { handleError } from '../util';
import { io } from '../server';
import moment from 'moment';

export function getSnippets(req, res) {
  Snippet.find({
    createdAt: {
      $gte: moment().startOf('day').subtract(30, 'd'),
    },
  }).sort('createdAt')
    .exec((err, snippets) => {
      if (err) {
        return handleError(res, err);
      }
      res.json(snippets);
    });
}

export function addSnippet(req, res) {
  if (!req.body.text) {
    return res.status(403).end();
  }
  const newSnippet = new Snippet({
    ...req.body,
    user: req.user._id,
  });
  newSnippet.cuid = cuid();
  newSnippet.save((err, snippet) => {
    if (err) {
      return handleError(res, err);
    }
    io.emit('sendSnippet', snippet.toJSON());
    return res.status(200).json(snippet);
  });
}
