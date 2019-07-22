import React from "react";

interface Props {
  message: string;
}

class Notification extends React.PureComponent<Props> {
  render() {
    const { message } = this.props;
    return (
      <div className={"notification-wrapper"}>
        <div className={"message"}>{message}</div>
      </div>
    );
  }
}

export default Notification;
