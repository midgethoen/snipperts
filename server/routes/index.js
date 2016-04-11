import { Router } from 'express';
import snippets from './snippet.routes';
import topics from './topic.routes';
import users from './user.routes';

export const api = new Router();

api.use('/snippets', snippets);
api.use('/users', users);
api.use('/topics', topics);
