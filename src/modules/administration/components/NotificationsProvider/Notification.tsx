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
  timeout: any;
}

const notificationTimeout = 15000;

class Notification extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      show: false,
      timeout: null
    };

    this.hideNotification = this.hideNotification.bind(this);
  }

  private showNotification = setTimeout(
    () => this.setState({ show: true }),
    400
  );

  componentDidMount() {
    const { id } = this.props;
    this.setState({
      timeout: setTimeout(() => this.hideNotification(id), notificationTimeout)
    });
  }

  componentWillUnmount() {
    const { timeout } = this.state;
    const { id, markAsSeen } = this.props;
    clearTimeout(timeout);
    clearTimeout(this.showNotification);
    markAsSeen(id);
  }

  hideNotification(id: number) {
    this.setState({ show: !this.state.show });
    setTimeout(() => this.props.markAsSeen(id), 400);
  }

  render() {
    const { message, id } = this.props;
    const { show } = this.state;

    return (
      <CSSTransition
        in={show}
        timeout={400}
        classNames="notification-wrapper"
        unmountOnExit
        onExited={() => this.props.markAsSeen(id)}
      >
        <div className={"notification-wrapper message is-dark"}>
          <div className={"message-header"}>
            <p>Notification</p>
            <button className="delete" aria-label="delete" onClick={() => this.hideNotification(id)}></button>
          </div>
          <div className={"message-body"}>{message}</div>
          <TimeBar timeRemaining={Math.floor(notificationTimeout / 1000)} />
        </div>
      </CSSTransition>
    );
  }
}

export default Notification;
