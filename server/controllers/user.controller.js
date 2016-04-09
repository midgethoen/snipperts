import User from '../models/user';
import { handleError } from '../util';

export function getUsers(req, res) {
  User.find().exec((err, users) => {
    if (err) {
      return handleError(res, err);
    }
    res.json(users);
  });
}
