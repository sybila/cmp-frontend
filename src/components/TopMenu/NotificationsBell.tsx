import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

class NotificationsBell extends React.PureComponent {
  render() {
    return (
      <div className={"notification nav-link"} data-count={5}>
        <FontAwesomeIcon icon={faBell} />
      </div>
    );
  }
}

export default NotificationsBell;
