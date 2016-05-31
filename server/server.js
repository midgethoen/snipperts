import Express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
import logger from 'morgan';

// Webpack Requirements
import webpack from 'webpack';
import config from '../webpack.config.dev';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

// Initialize the Express App
const app = new Express();

if (process.env.NODE_ENV !== 'production') {
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
  app.use(logger('dev'));
}

// React And Redux Setup
import { configureStore } from '../shared/redux/store/configureStore';
import { Provider } from 'react-redux';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';

// Import required modules
import routes from '../shared/routes';
import { fetchComponentData } from './util/fetchData';
import serverConfig from './config';

import {
  sessions,
  passport,
} from './middlewares';

import { api } from './routes';

// MongoDB Connection
mongoose.connect(serverConfig.mongoURL, (error) => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    throw error;
  }
});

// user sessions
app.use(sessions);

// use passport session
app.use(passport.initialize());
app.use(passport.session());

// Apply body Parser and server public assets and routes
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
app.use(Express.static(path.resolve(__dirname, '../static')));

app.use('/api', api);

const notApi = /^(?!\/api\/)/;

app.get('/auth/google',
  passport.authenticate('google', {
    failureRedirect: '/login',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ],
  }));

app.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login',
  }));

// Render Initial HTML
const renderFullPage = (html, initialState) => {
  const cssPath = process.env.NODE_ENV === 'production' ? '/css/app.min.css' : '/css/app.css';
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <!-- Required meta tags always come first. -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.2/css/bootstrap.min.css"
          integrity="sha384-y3tfxAZXuh4HwSYylfB+J125MxIs6mR5FOHamPBG064zB+AFeWH94NdvaCBm8qnd"
          crossorigin="anonymous"
        />
        <title>Yippie! Snipperts</title>
        <link rel="stylesheet" href=${cssPath} />
        <link href='https://fonts.googleapis.com/css?family=Open%20Sans:400,300,700' rel='stylesheet' type='text/css'/>
        <link rel="shortcut icon" href="/favicon.ico?v=1200" type="image/x-icon">
        <link rel="icon" href="/favicon.ico?v=1200" type="image/x-icon">
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
        </script>
        <script src="/dist/bundle.js"></script>
      </body>
    </html>
  `;
};

// import requiresLogin from './middlewares';

const renderError = err => {
  const softTab = '&#32;&#32;&#32;&#32;';
  const errTrace = process.env.NODE_ENV !== 'production' ?
    `:<br><br><pre style="color:red">${softTab}${err.stack.replace(/\n/g, `<br>${softTab}`)}</pre>` : '';
  return renderFullPage(`Server Error${errTrace}`, {});
};

// Server Side Rendering based on routes matched by React-router.

app.use(notApi, (req, res, next) => {
  if (req.url !== '/login' && !req.isAuthenticated()) {
    return res.redirect(302, '/login');
  }
  match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
    if (err) {
      return res.status(500).end(renderError(err));
    }

    if (redirectLocation) {
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }

    if (!renderProps) {
      return next();
    }

    const initialState = { };

    const store = configureStore(initialState);

    return fetchComponentData(store, renderProps.components, renderProps.params)
      .then(() => {
        const initialView = renderToString(
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        );
        const finalState = store.getState();

        res.status(200).end(renderFullPage(initialView, finalState));
      });
      // .catch(err => { throw err; });
  });
});

// start app
const server = app.listen(serverConfig.port, (error) => {
  if (!error) {
    console.log(`MERN is running on port: ${serverConfig.port}! Build something amazing!`); // eslint-disable-line
  }
});

export const io = require('socket.io')(server);

export default app;
