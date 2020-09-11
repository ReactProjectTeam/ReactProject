import React from 'react';
import { Route,Redirect } from 'react-router-dom';

function PrivateRouteSignUpSignIn({ children, isAuth }) {
    return <Route render={() => (isAuth ? <Redirect to="/" /> : children )} />;
}

export default PrivateRouteSignUpSignIn;
