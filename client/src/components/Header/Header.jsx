import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
    isAuthenticated,
    isAuthenticatedAs,
    login as loginLocalStorage,
    logout as logoutLocalStorage
} from "api/Auth";
import "./Header.css";

class Header extends Component {
    state = {};

    handleLogout = event => {
        event.preventDefault();
        logoutLocalStorage();
    };

    render() {
        let options = [];

        if (isAuthenticatedAs(["ADMIN"])) {
            options.push(
                <span className="header-item">
                    <Link to="/register">Register User</Link>
                </span>
            );
        }
        if (isAuthenticatedAs(["PROFESSOR", "ADMIN"])) {
            options.push(
                <React.Fragment>
                    <span className="header-item">
                        <Link to="/problem">Create Problem</Link>
                    </span>
                    <span className="header-item">
                        <Link to="/problems">Problems</Link>
                    </span>
                    <span className="header-item">
                        <Link to="/problemlist">Create Problem List</Link>
                    </span>
                </React.Fragment>
            );
        }

        if (isAuthenticated()) {
            options.push(
                <React.Fragment>
                    <span className="header-item">
                        <Link to="/problemlists">Problem Lists</Link>
                    </span>
                    <span className="header-item">
                        <button
                            onClick={e => {
                                this.handleLogout(e);
                                window.location.reload();
                            }}
                        >
                            Logout
                        </button>
                    </span>
                </React.Fragment>
            );
        } else {
            options.push(
                <span className="header-item">
                    <Link to="/login">Sign In</Link>
                </span>
            );
        }

        return (
            <header className="header-container">
                <div className="header-left-div">
                    <span className="header-item">
                        <Link to="/">PHILIPE</Link>
                    </span>
                </div>
                <div className="header-right-div">{options}</div>
            </header>
        );
    }
}

export default Header;
