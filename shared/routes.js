import { Route, IndexRoute } from 'react-router';
import React from 'react';
import App from './container/App';
import PostContainer from './container/PostContainer/PostContainer';
import { LoginView } from './container/views';

const routes = (
  <Route path="/" component={App} >
    <IndexRoute component={PostContainer} />
    <Route path="/login" component={LoginView}/>
  </Route>
);

export default routes;
