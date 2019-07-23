import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

import TimeBar from "./TimeBar";

interface Props {
  id: number;
  message: string;
  markAsSeen: (id: number) => any;
}

const notificationTimeout = 15000;

class Notification extends React.PureComponent<Props> {
  render() {
    const { message, id } = this.props;
    const timeout = setTimeout(
      () => this.props.markAsSeen(id),
      notificationTimeout
    );
    return (
      <div className={"notification-wrapper"}>
        <div className={"icon info-icon"}>
          <FontAwesomeIcon icon={faInfoCircle} size="lg" />
        </div>
        <div className={"message"}>{message}</div>
        <div
          className={"icon close-icon"}
          onClick={() => this.props.markAsSeen(id)}
        >
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </div>
        <TimeBar timeRemaining={Math.floor(notificationTimeout / 1000)} />
      </div>
    );
  }
}

export default Notification;
