import React, { Component } from "react";
import Form from "components/Form/Form";
import "./Problems.css";

class Problems extends Component {
    state = {
        problems: []
    };

    componentDidMount() {
        this.requestProblems();
    }

    requestProblems = () => {
        fetch(`/api/problem`, {
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
                        problems: data.problems
                    });
                }
            })
            .catch(err => console.log(err));
    };

    handleEdit = (event, id) => {
        event.preventDefault();
        this.props.history.push(`problem/${id}`);
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
                    {this.state.problems.map(problem => {
                        const { _id, title, description, language } = problem;

                        return (
                            <div key={_id} className="problem-item">
                                <div>
                                    <button
                                        className="sidebutton sidebutton-edit"
                                        onClick={e => this.handleEdit(e, _id)}
                                    >
                                        E
                                    </button>
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

export default Problems;
