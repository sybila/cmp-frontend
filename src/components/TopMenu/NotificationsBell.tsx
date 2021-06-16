import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

interface Props {
  handleClick: () => void;
  news: boolean;
}

class NotificationsBell extends React.PureComponent<Props> {
  render() {
    const { news } = this.props;
    return (
      <div className={`notification-bell-wrapper`}>
        <div
          className={`notification-bell nav-link ${news ? "news" : ""}`}
          onClick={() => this.props.handleClick()}
        >
          <FontAwesomeIcon icon={faBell} />
        </div>
      </div>
    );
  }
}

export default NotificationsBell;
