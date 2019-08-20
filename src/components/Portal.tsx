import React from "react";
import ReactDOM from "react-dom";

const modalRoot = document.getElementById("portal-root");

/**
 * Creates React Portal, appends elements to different node
 */
class Portal extends React.Component {
  constructor(props: any) {
    super(props);
  }

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
