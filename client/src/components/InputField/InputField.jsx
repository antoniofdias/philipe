import React, { Component } from "react";
import "./InputField.css";

class InputField extends Component {
  state = {
    styles: {}
  };
  render() {
    const { className, ...rest } = this.props;
    return (
      <input
        ref="input"
        style={this.state.styles}
        className={`${className} input-field`}
        type="textarea"
        placeholder="Placeholder"
        {...rest}
        onFocus={() => {
          this.setState({
            styles: {
              borderColor: "#00000000"
            }
          });
        }}
        onBlur={() => this.handleFocusOut(this.refs.input.value)}
      />
    );
  }

  handleFocusOut = value => {
    if (!value || value === "") {
      this.setState({
        styles: {
          borderColor: "red"
        }
      });
    }
  };
}

export default InputField;
