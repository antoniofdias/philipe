import React, { Component } from "react";
import InputField from "components/InputField/InputField";
import SelectField from "components/SelectField/SelectField";
import Alert from "components/Alert/Alert";
import Form from "components/Form/Form";
import "./ProblemList.css";

class ProblemList extends Component {
    state = {};
    constructor() {
        super();

        this.state = {
            language: "PROLOG",
            problems: [],
            title: "",
            description: "",
            selectedProblems: [],
            alert: {}
        };
    }

    componentWillMount() {
        fetch(`/api/problem/${this.state.language}`, {
            method: "get",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    this.setState({
                        problems: data.problems
                    });
                }
            })
            .catch(err => console.log(err));
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
        }
    };

    handleSubmit = event => {
        event.preventDefault();

        const { title, description, language, selectedProblems } = this.state;

        fetch(`/api/problemlist`, {
            method: "post",
            body: JSON.stringify({
                title,
                description,
                language,
                problems: selectedProblems
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

    handleSelectChange = event => {
        fetch(`/api/problem/${event.target.value}`, {
            method: "get",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    this.setState({
                        problems: data.problems
                    });
                }
            })
            .catch(err => console.log(err));

        this.setState({
            language: event.target.value,
            selectedProblems: []
        });
    };

    handleAttributesChange = event => {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
    };

    handleCheckBoxChange = (event, key) => {
        const selectedProblems = this.state.selectedProblems;

        if (selectedProblems.includes(key)) {
            selectedProblems.splice(selectedProblems.indexOf(key), 1);
        } else {
            selectedProblems.push(key);
        }
        this.setState({
            selectedProblems: selectedProblems
        });
    };

    render() {
        let key = 1;
        return (
            <Form title="Problem List" onSubmit={this.handleSubmit}>
                <Alert
                    value={this.state.alert.value}
                    alertType={this.state.alert.type}
                />
                <InputField
                    type="textarea"
                    name="title"
                    placeholder="Title"
                    autoFocus={true}
                    onChange={this.handleAttributesChange}
                />
                <InputField
                    type="textarea"
                    name="description"
                    placeholder="Description"
                    onChange={this.handleAttributesChange}
                />

                <SelectField
                    options={["PROLOG", "RACKET"]}
                    onChange={this.handleSelectChange}
                />

                <div className="problems-container">
                    <label>Problems</label>
                    {this.state.problems.map(problem => {
                        const { _id, title, description, language } = problem;

                        return (
                            <div key={_id} className="problem-item">
                                <input
                                    checked={this.state.selectedProblems.includes(
                                        _id
                                    )}
                                    type="checkbox"
                                    onChange={event =>
                                        this.handleCheckBoxChange(event, _id)
                                    }
                                />
                                <span>{key++}</span>
                                <span>{title}</span>
                                <span>{description}</span>
                                <span>{language}</span>
                            </div>
                        );
                    })}
                </div>
                <InputField type="submit" value="Finish" />
            </Form>
        );
    }
}

export default ProblemList;
