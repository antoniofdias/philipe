import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticatedAs } from "./Auth";

class PrivateRoute extends Component {
    render() {
        const { path, component, redirect, userTypes, ...rest } = this.props;
        if (isAuthenticatedAs(userTypes)) {
            return <Route path={path} component={component} {...rest} />;
        } else {
            return <Redirect to={redirect || "/"} />;
        }
    }
}

export default PrivateRoute;
