import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

interface Props {
  handleClick: () => void;
}

class NotificationsBell extends React.PureComponent<Props> {
  render() {
    return (
      <div
        className={"notification nav-link"}
        onClick={() => this.props.handleClick()}
      >
        <FontAwesomeIcon icon={faBell} />
      </div>
    );
  }
}

export default NotificationsBell;
