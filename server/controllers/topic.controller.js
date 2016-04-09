import Topic from '../models/topic';
import { handleError } from '../util';

export function getTopics(req, res) {
  Topic.find().exec((err, topics) => {
    if (err) {
      return handleError(res, err);
    }
    res.json(topics);
  });
}
