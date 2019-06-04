import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ProblemList from "./pages/ProblemList/ProblemList";
import ProblemLists from "./pages/ProblemLists/ProblemLists";
import Problem from "./pages/Problem/Problem";
import Problems from "pages/Problems/Problems";
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
                        <Route
                            path="/problemlist/:id?"
                            component={ProblemList}
                        />
                        <Route path="/problemlists" component={ProblemLists} />
                        <Route path="/problem/:id?" component={Problem} />
                        <Route path="/problems" component={Problems} />
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
