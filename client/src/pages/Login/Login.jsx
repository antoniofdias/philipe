import React, { Component } from "react";
import InputField from "../../components/InputField/InputField";
import { Redirect } from "react-router-dom";
import Form from "../../components/Form/Form";
import Alert from "../../components/Alert/Alert";
import { isAuthenticated, login as loginLocalStorage } from "../../api/Auth";
import "./Login.css";

class Login extends Component {
  state = {
    username: null,
    password: null,
    error: {
      username: "",
      password: ""
    },
    alert: {}
  };

  handleResponse = data => {
    switch (data.error) {
      case "blank":
        this.setState({
          alert: {
            type: "error",
            value: data.message
          }
        });
        return false;

      case "wrong-credentials":
        this.setState({
          alert: {
            type: "error",
            value: data.message
          }
        });
        return false;

      case null:
        this.setState({
          alert: {
            type: "success",
            value: data.message
          }
        });
        return true;

      default:
        this.setState({
          alert: {}
        });
        break;
    }
  };

  handleSubmit = event => {
    event.preventDefault();

    const { username, password } = this.state;

    fetch("/api/login", {
      method: "post",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        if (this.handleResponse(data)) {
          console.log(data.email);
          loginLocalStorage({
            username,
            email: data.user.email,
            type: data.user.type
          });
        }
      })
      .catch(err => console.log(err));
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    if (isAuthenticated()) {
      return <Redirect to="/account" />;
    }

    return (
      <Form title="Login" onSubmit={this.handleSubmit}>
        <Alert
          value={this.state.alert.value}
          alertType={this.state.alert.type}
        />
        <InputField
          name="username"
          type="username"
          onChange={this.handleChange}
          placeholder="Username"
          autoFocus={true}
        />
        <InputField
          name="password"
          type="password"
          placeholder="Password"
          onChange={this.handleChange}
        />
        <InputField type="submit" value="Sign In" />
      </Form>
    );
  }
}

export default Login;
