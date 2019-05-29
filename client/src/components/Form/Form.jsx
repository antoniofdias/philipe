import React, { Component } from "react";
import "./Form.css";

class Form extends Component {
  render() {
    const { title, children, ...rest } = this.props;
    return (
      <div className="form-container">
        <form {...rest}>
          <label>{title || "Form"}</label>
          {children}
        </form>
      </div>
    );
  }
}

export default Form;
