import React, { Component } from "react";
import InputField from "components/InputField/InputField";
import Form from "components/Form/Form";
import "./Submission.css";
import { getUsername } from "api/Auth";

class Submission extends Component {
    state = {
        code: null
    };

    handleChange = event => {
        const { name, value } = event.target;

        this.setState({ [name]: value });
    };

    render() {
        const { title } = this.props;
        const username = getUsername();

        return (
            <Form
                title="Submission"
                onSubmit={e =>
                    this.props.handleSubmission(e, username, this.state.code)
                }
            >
                <div className="problemsBox">
                    <label>{title}</label>
                    <textarea
                        id="code"
                        name="code"
                        onChange={this.handleChange}
                        placeholder="Code"
                        autoFocus={true}
                    />
                    <InputField type="submit" value="Send" />
                </div>
            </Form>
        );
    }
}

export default Submission;
