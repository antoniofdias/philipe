import React, { Component } from "react";
import Form from "components/Form/Form";
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

export default ProblemLists;
