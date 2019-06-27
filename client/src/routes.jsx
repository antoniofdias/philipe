import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import List from "./pages/List/List";
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
                        <PrivateRoute
                            userTypes={["ADMIN"]}
                            path="/register"
                            component={Register}
                            redirect="/login"
                        />

                        <PrivateRoute
                            path="/list/:id?"
                            component={List}
                            redirect="/login"
                        />
                        <PrivateRoute
                            userTypes={["ADMIN", "PROFESSOR"]}
                            path="/problemlist/:id?"
                            component={ProblemList}
                            redirect="/login"
                        />
                        <PrivateRoute
                            path="/problemlists"
                            component={ProblemLists}
                            redirect="/login"
                        />
                        <PrivateRoute
                            userTypes={["ADMIN", "PROFESSOR"]}
                            path="/problem/:id?"
                            component={Problem}
                            redirect="/login"
                        />
                        <PrivateRoute
                            userTypes={["ADMIN", "PROFESSOR"]}
                            path="/problems"
                            component={Problems}
                            redirect="/login"
                        />
                        <Route path="*" component={Login} />
                    </Switch>
                </BrowserRouter>
            </React.Fragment>
        );
    }
}

export default Routes;
