import React from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { CSSTransition } from "react-transition-group";

import { AppState } from "../../reducers/globalReducer";
import {
  inboxState,
  getNotifications
} from "../../selectors/notificationsSelectors";
import { NotificationModel } from "../../models/Notification";
import { loadNotifications } from "../../actions/notificationActions";
import InboxItem from "./InboxItem";

interface Props {
  isOpen: boolean;
  loadNotifications: (id: number) => any;
  notifications: NotificationModel[];
}

interface State {}

class Inbox extends React.Component<Props, State> {
  componentDidMount() {
    const { loadNotifications } = this.props;
    loadNotifications(99);
  }

  render() {
    const { isOpen, notifications } = this.props;

    const nodes = notifications.map(item => {
      return <InboxItem title={"Test"} text={item.message} />;
    });

    return (
      <div>
        <CSSTransition
          in={isOpen}
          timeout={300}
          classNames="inbox"
          unmountOnExit
        >
          <div className={"inbox"}>
            <h3>Notifications</h3>
            <div className={"inbox-wrapper"}>{nodes}</div>
          </div>
        </CSSTransition>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  isOpen: inboxState(state),
  notifications: getNotifications(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadNotifications: bindActionCreators(loadNotifications, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Inbox);
