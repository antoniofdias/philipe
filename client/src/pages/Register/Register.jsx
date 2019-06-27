import React, { Component } from "react";
import InputField from "components/InputField/InputField";
import Form from "components/Form/Form";
import Alert from "components/Alert/Alert";
import SelectField from "components/SelectField/SelectField";
import "./Register.css";

class Register extends Component {
    state = {
        type: "STUDENT",
        alert: {}
    };

    handleResponse = ({ error, message }) => {
        console.log(message);

        if (error) {
            this.setState({
                alert: {
                    type: "error",
                    value: message
                }
            });
            return false;
        } else {
            this.setState({
                alert: {
                    type: "success",
                    value: message
                }
            });
            return true;
        }
    };

    handleSubmit = event => {
        event.preventDefault();

        const { username, password, email, type } = this.state;

        fetch("/api/register", {
            method: "post",
            body: JSON.stringify({ username, password, email, type }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                this.handleResponse(data);
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
                <SelectField
                    name="type"
                    options={["STUDENT", "MONITOR", "PROFESSOR", "ADMIN"]}
                    onChange={this.handleChange}
                />
                <InputField type="submit" value="Register" />
            </Form>
        );
    }
}

export default Register;
