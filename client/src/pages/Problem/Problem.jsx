import React, { Component } from "react";
import InputField from "components/InputField/InputField";
import Alert from "components/Alert/Alert";
import SelectField from "components/SelectField/SelectField";
import Form from "components/Form/Form";
import "./Problem.css";

class Problem extends Component {
    state = {
        alert: {},
        title: "",
        description: "",
        language: "PROLOG"
    };

    componentDidMount() {
        const id = this.props.match.params.id;

        if (id) {
            fetch(`/api/problem/find/${id}`, {
                method: "get",
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(response => response.json())
                .then(data => {
                    const { title, description, language } = data.problem;

                    this.setState({
                        _id: id,
                        title: title,
                        description: description,
                        language: language
                    });
                });
        }
    }

    handleResponse = data => {
        switch (data.error) {
            case null:
                this.setState({
                    alert: {
                        type: "success",
                        value: data.message
                    }
                });
                return true;
            case "missing-inputs":
                this.setState({
                    alert: {
                        type: "error",
                        value: data.message
                    }
                });
                return false;
            default:
                this.setState({
                    alert: {}
                });
                break;
        }
    };

    handleSubmit = event => {
        event.preventDefault();

        const { _id, title, description, language } = this.state;

        fetch(`/api/problem`, {
            method: "post",
            body: JSON.stringify({
                _id,
                title,
                description,
                language
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    this.handleResponse(data);
                    console.log(data);
                }
            })
            .catch(err => console.log(err));
    };

    handleAttributesChange = event => {
        const { name, value } = event.target;

        const reader = new FileReader();
        reader.readAsText(event.target.files[0]);
        console.log(reader);

        this.setState({ [name]: value });
    };

    render() {
        return (
            <Form title="Problem" onSubmit={this.handleSubmit}>
                <Alert
                    value={this.state.alert.value}
                    alertType={this.state.alert.type}
                />
                <InputField
                    type="textarea"
                    name="title"
                    placeholder="Title"
                    value={this.state.title}
                    autoFocus={true}
                    onChange={this.handleAttributesChange}
                />
                <textarea
                    id="description"
                    name="description"
                    placeholder="Description"
                    value={this.state.description}
                    onChange={this.handleAttributesChange}
                />
                <SelectField
                    options={["PROLOG", "RACKET"]}
                    value={this.state.language}
                    name="language"
                    onChange={this.handleAttributesChange}
                />
                {/* <input
                    id="test_cases"
                    type="file"
                    name="test_cases"
                    value={this.state.title}
                    onChange={this.handleAttributesChange}
                /> */}
                <InputField type="submit" value="Finish" />
            </Form>
        );
    }
}

export default Problem;
