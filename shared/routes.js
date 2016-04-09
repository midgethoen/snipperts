import { Route, IndexRoute } from 'react-router';
import React from 'react';
import App from './container/App';
import {
  LoginView,
  FeedView,
} from './container/views';

const routes = (
  <Route path="/" component={App} >
    <IndexRoute component={FeedView} />
    <Route path="/login" component={LoginView}/>
  </Route>
);

export default routes;
