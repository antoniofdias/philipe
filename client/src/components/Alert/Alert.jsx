import React, { Component } from "react";
import "./Alert.css";

class Alert extends Component {
  render() {
    if (this.props.value) {
      return (
        <div className={`c-alert c-alert-${this.props.alertType}`}>
          <span>{this.props.value}</span>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Alert;
