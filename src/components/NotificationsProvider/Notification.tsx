import React from "react";

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
      <div
        className={"notification-wrapper"}
        onClick={() => this.props.markAsSeen(id)}
      >
        <div className={"message"}>{message}</div>
        <TimeBar timeRemaining={Math.floor(notificationTimeout / 1000)} />
      </div>
    );
  }
}

export default Notification;
