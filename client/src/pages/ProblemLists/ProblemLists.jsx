import React, { Component } from "react";
import Form from "components/Form/Form";
import { isAuthenticatedAs, login as loginLocalStorage } from "api/Auth";

import "./ProblemLists.css";

class ProblemLists extends Component {
    state = {
        problemlists: []
    };

    componentDidMount() {
        this.requestProblemLists();
    }

    requestProblemLists = () => {
        fetch(`/api/problemlist`, {
            method: "get",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data) {
                    this.setState({
                        problemlists: data.problemlists
                    });
                }
            })
            .catch(err => console.log(err));
    };

    handleEdit = (event, id) => {
        event.preventDefault();
        this.props.history.push(`problemlist/${id}`);
    };

    handleRemove = (event, id) => {
        event.preventDefault();

        fetch(`/api/problemlist`, {
            method: "delete",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                _id: id
            })
        })
            .then(response => {
                this.requestProblemLists();
            })
            .catch(err => console.log(err));
    };

    render() {
        let key = 1;

        return (
            <Form title="Problem List" onSubmit={this.handleSubmit}>
                <div className="problems-container">
                    <label>Problems</label>
                    <div className="problem-item">
                        <span>
                            <b>Select</b>
                        </span>
                        <span>
                            <b>Id</b>
                        </span>
                        <span>
                            <b>Title</b>
                        </span>
                        <span>
                            <b>Description</b>
                        </span>
                        <span>
                            <b>Language</b>
                        </span>
                    </div>
                    {this.state.problemlists.map(problemlist => {
                        const {
                            _id,
                            title,
                            description,
                            language
                        } = problemlist;

                        const options = [];

                        if (isAuthenticatedAs(["ADMIN", "PROFESSOR"])) {
                            options.push(
                                <button
                                    className="sidebutton sidebutton-edit"
                                    onClick={e => this.handleEdit(e, _id)}
                                >
                                    E
                                </button>
                            );

                            options.push(
                                <button
                                    className="sidebutton sidebutton-remove"
                                    onClick={e => this.handleRemove(e, _id)}
                                >
                                    R
                                </button>
                            );
                        }

                        options.push(
                            <button
                                className="sidebutton sidebutton-submit"
                                onClick={() =>
                                    this.props.history.push(`/list/${_id}`)
                                }
                            >
                                S
                            </button>
                        );

                        return (
                            <div key={_id} className="problem-item">
                                <div>
                                    {options}
                                    {/* <button className="sidebutton sidebutton-remove">
                                        X
                                    </button> */}
                                </div>
                                <span>{key++}</span>
                                <span>{title}</span>
                                <span>{description}</span>
                                <span>{language}</span>
                            </div>
                        );
                    })}
                </div>
            </Form>
        );
    }
}

export default ProblemLists;
