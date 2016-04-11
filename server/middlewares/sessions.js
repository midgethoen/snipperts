import session from 'express-session';
import connectMongo from 'connect-mongo';

import serverConfig from '../config';

const MongoStore = connectMongo(session);

export const sessions = session({
  secret: serverConfig.sessionSecret,
  store: new MongoStore({
    url: serverConfig.mongoURL,
  }),
});
