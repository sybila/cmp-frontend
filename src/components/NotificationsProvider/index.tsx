import React from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import _ from "lodash";

import { AppState } from "../../reducers/globalReducer";
import {
  loadNotifications,
  markAsSeen
} from "../../actions/notificationActions";
import { getNotificationsById } from "../../selectors/notificationsSelectors";
import { getUser } from "../../selectors/userSelectors";
import { NotificationModel } from "../../models/Notification";
import { UserModel } from "../../models/User";

import Notification from "./Notification";

interface Props {
  loadNotifications: (id: number) => any;
  markAsSeen: (id: number) => any;
  notifications: NotificationModel[];
  user: UserModel;
}

class NotificationsProvider extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  componentDidUpdate(prevProps, prevState) {
    // TODO: Valid ID
    const { user, loadNotifications } = this.props;
    if (!_.isEqual(prevProps.user, user) && user) {
      setTimeout(() => loadNotifications(99), 5000);
    }
  }

  render() {
    const { notifications, markAsSeen, user } = this.props;

    const nodes = notifications
      .filter(i => !i.seen)
      .map(i => {
        return (
          <Notification
            id={i.id}
            key={i.id}
            message={i.message}
            markAsSeen={markAsSeen}
          ></Notification>
        );
      });

    return (
      <div className={"notifications-container"}>
        {/* TEMP: For notification testing purposes */}
        {/*
          <button onClick={() => this.props.loadNotifications(99)}>
            Add notification
          </button>
        */}
        {user && nodes}
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  notifications: getNotificationsById(state),
  user: getUser(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadNotifications: bindActionCreators(loadNotifications, dispatch),
  markAsSeen: bindActionCreators(markAsSeen, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationsProvider);
