import React, { Component } from "react";
import InputField from "components/InputField/InputField";
import Form from "components/Form/Form";
import { getUsername } from "api/Auth";
import "./List.css";
import Submission from "../Submission/Submission";

class List extends Component {
    state = {
        list: null,
        problems: [],
        submissions: [],
        submit: false,
        selected: {
            title: "Example",
            problem_id: null
        }
    };

    handleEdit = (event, problem_id) => {
        event.preventDefault();

        let title;

        for (let i = 0; i < this.state.problems.length; i++) {
            if (this.state.problems[i]._id === problem_id) {
                title = this.state.problems[i].title;
                break;
            }
        }

        this.setState({
            submit: true,
            selected: {
                title: title,
                problem_id: problem_id
            }
        });
    };

    handleSubmission = (event, username, code) => {
        event.preventDefault();

        if (code) {
            // Submit to backend
            fetch(`/api/submissions`, {
                method: "post",
                body: JSON.stringify({
                    username,
                    code,
                    problem: this.state.selected.title,
                    problem_id: this.state.selected.problem_id,
                    list_id: this.state.list._id
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data) {
                        console.log(data);
                        this.setState({ submit: false });
                    }
                })
                .catch(err => console.log(err));
        }
    };

    componentDidUpdate() {
        this.getSubmissions();
    }

    componentDidMount() {
        const id = this.props.match.params.id;

        if (!id) {
            return;
        }

        fetch(`/api/problemlist/find/${id}`, {
            method: "get",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState(
                    {
                        list: data.problemlist
                    },
                    () => {
                        for (
                            let i = 0;
                            i < this.state.list.problems.length;
                            i++
                        ) {
                            const id = this.state.list.problems[i];

                            fetch(`/api/problem/find/${id}`, {
                                method: "get",
                                headers: {
                                    "Content-Type": "application/json"
                                }
                            })
                                .then(response => response.json())
                                .then(data => {
                                    this.setState(
                                        {
                                            problems: [
                                                ...this.state.problems,
                                                data.problem
                                            ]
                                        },
                                        this.getSubmissions
                                    );
                                });
                        }
                    }
                );
            });
    }

    getSubmissions = () => {
        return fetch(
            `/api/submissions/${getUsername()}&${this.state.list._id}`,
            {
                method: "get",
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
            .then(response => response.json())
            .then(data => {
                this.setState({
                    submissions: data.submissions
                });
            });
    };

    render() {
        if (this.state.list) {
            const { _id, title, description } = this.state.list;
            let key = 1;
            if (this.state.submit) {
                return (
                    <Submission
                        title={this.state.selected.title}
                        handleSubmission={this.handleSubmission}
                    />
                );
            } else {
                return (
                    <Form title={title}>
                        <div className="problemsBox">
                            <label>Problems</label>
                            {this.state.problems.map(problem => {
                                const { title, description, _id } = problem;
                                return (
                                    <div key={_id} className="problem">
                                        <button
                                            className="sidebutton sidebutton-submit"
                                            onClick={e =>
                                                this.handleEdit(e, _id)
                                            }
                                        >
                                            Submit
                                        </button>
                                        <span>{key++}</span>
                                        <span>{title}</span>
                                        <span>{description}</span>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="problemsBox">
                            <label>Submissions</label>
                            {this.state.submissions.map(submission => {
                                const { problem, result } = submission;
                                return (
                                    <div key={key++} className="problem">
                                        <span>{problem}</span>
                                        <span className={result}>{result}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </Form>
                );
            }
        } else {
            return null;
        }
    }
}

export default List;
