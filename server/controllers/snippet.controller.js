import Snippet from '../models/snippet';
import cuid from 'cuid';
import { handleError } from '../util';

export function getSnippets(req, res) {
  Snippet.find().sort('-createdAt').exec((err, snippets) => {
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
  const newSnippet = new Snippet(req.body);
  newSnippet.cuid = cuid();
  newSnippet.save((err, snippet) => {
    if (err) {
      return handleError(res, err);
    }
    return res.status(200).json(snippet);
  });
}
