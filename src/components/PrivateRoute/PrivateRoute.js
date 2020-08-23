import React from 'react';
import { Route,Redirect } from 'react-router-dom';

function PrivateRoute({ children, isAuth }) {
  return <Route render={() => (isAuth ? children : <Redirect to="/signin" />)} />;
}

export default PrivateRoute;
