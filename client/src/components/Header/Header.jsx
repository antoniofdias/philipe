import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

class Header extends Component {
  state = {};
  render() {
    return (
      <header className="header-container">
        <div className="header-left-div">
          <span className="header-item">
            <Link to="/">PHILIPE</Link>
          </span>
        </div>
        <div className="header-right-div">
          <span className="header-item">
            <Link to="/register">Register</Link>
          </span>
          <span className="header-item">
            <Link to="/login">Sign In</Link>
          </span>
        </div>
      </header>
    );
  }
}

export default Header;
