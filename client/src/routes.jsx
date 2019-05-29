import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ProblemList from "./pages/ProblemList/ProblemList";
import Problem from "./pages/Problem/Problem";
import PrivateRoute from "./api/PrivateRoute";

class Routes extends Component {
  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route path="/login" component={Login} />
            <Route
              //userTypes={["ADMIN"]}
              path="/register"
              component={Register}
            />
            <Route path="/problemlist" component={ProblemList} />
            <Route path="/problem" component={Problem} />
            <PrivateRoute
              path="/account"
              component={Header}
              redirect="/login"
            />
          </Switch>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default Routes;
