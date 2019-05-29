import React, { Component } from "react";
import InputField from "../../components/InputField/InputField";
import Form from "../../components/Form/Form";
import Alert from "../../components/Alert/Alert";
import SelectField from "../../components/SelectField/SelectField";
import "./Register.css";

class Register extends Component {
  state = {
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

      case "already-exists":
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

    const { username, password, passwordConfirmation, email } = this.state;

    fetch("/api/register", {
      method: "post",
      body: JSON.stringify({ username, password, email }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        this.handleResponse(data);
        console.log(data);
      })
      .catch(err => console.log(err));
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    return (
      <Form title="Register" onSubmit={this.handleSubmit}>
        <Alert
          value={this.state.alert.value}
          alertType={this.state.alert.type}
        />
        <InputField
          onChange={this.handleChange}
          name="email"
          type="email"
          placeholder="Email"
          autoFocus={true}
        />
        <InputField
          onChange={this.handleChange}
          name="username"
          type="textarea"
          placeholder="Username"
        />
        <InputField
          onChange={this.handleChange}
          name="password"
          type="password"
          placeholder="Password"
        />
        <InputField
          onChange={this.handleChange}
          name="passwordConfirmation"
          type="password"
          placeholder="Password Conformation"
        />
        <SelectField options={["STUDENT", "MONITOR", "PROFESSOR", "ADMIN"]} />
        <InputField type="submit" value="Register" />
      </Form>
    );
  }
}

export default Register;
