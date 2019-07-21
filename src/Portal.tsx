import React from "react";
import ReactDOM from "react-dom";

const modalRoot = document.getElementById("portal-root");

/**
 * Creates React Portal, appends elements to different node
 */
export class Portal extends React.Component {
  constructor(props) {
    super(props);
  }

  el = document.createElement("div");

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}
