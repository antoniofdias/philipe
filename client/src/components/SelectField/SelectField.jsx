import React, { Component } from "react";
import "./SelectField.css";

class SelectField extends Component {
  render() {
    const { options, ...rest } = this.props;
    let key = 1;
    return (
      <div className="select-container">
        <select {...rest}>
          {options.map(option => {
            return <option key={key++}>{option}</option>;
          })}
        </select>
      </div>
    );
  }
}

export default SelectField;
