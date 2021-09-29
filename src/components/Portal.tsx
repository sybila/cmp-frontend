import React from "react";
import ReactDOM from "react-dom";

export const modalRoot = document.getElementById("portal-root");

/**
 * Creates React Portal, appends elements to different node
 */
class Portal extends React.Component {
  el = document.createElement("div");

  componentDidMount() {
    this.el.className = "theme-default";
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}

export default Portal;
