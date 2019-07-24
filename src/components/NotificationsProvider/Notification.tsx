import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { CSSTransition } from "react-transition-group";

import TimeBar from "./TimeBar";

interface Props {
  id: number;
  message: string;
  markAsSeen: (id: number) => any;
}

interface State {
  show: boolean;
}

const notificationTimeout = 15000;

class Notification extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      show: false
    };

    this.hideNotification = this.hideNotification.bind(this);
  }

  hideNotification(id) {
    this.setState({ show: !this.state.show });
    setTimeout(() => this.props.markAsSeen(id), 500);
  }

  render() {
    const { message, id } = this.props;
    const { show } = this.state;

    const timeout = setTimeout(
      () => this.hideNotification(id),
      notificationTimeout
    );

    const timeoutShow = setTimeout(() => this.setState({ show: true }), 500);

    return (
      <CSSTransition
        in={show}
        timeout={500}
        classNames="notification-wrapper"
        unmountOnExit
      >
        <div className={"notification-wrapper"}>
          <div className={"icon info-icon"}>
            <FontAwesomeIcon icon={faInfoCircle} size="lg" />
          </div>
          <div className={"message"}>{message}</div>
          <div
            className={"icon close-icon"}
            onClick={() => this.hideNotification(id)}
          >
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </div>
          <TimeBar timeRemaining={Math.floor(notificationTimeout / 1000)} />
        </div>
      </CSSTransition>
    );
  }
}

export default Notification;
