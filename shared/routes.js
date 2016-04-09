import { Route, IndexRoute } from 'react-router';
import React from 'react';
import App from './container/App';
import {
  LoginView,
  FeedView,
} from './container/views';

console.log('deffff', LoginView, FeedView);

const routes = (
  <Route path="/" component={App} >
    <IndexRoute component={FeedView} />
    <Route path="/login" component={LoginView}/>
  </Route>
);

export default routes;
