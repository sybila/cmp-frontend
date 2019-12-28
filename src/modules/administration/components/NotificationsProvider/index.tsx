import React from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import _ from "lodash";

import { AppState } from "reducers/GlobalReducer";
import { loadNotifications, markAsSeen, markAsDisplayed } from "../../actions";
import { getNotifications } from "../../selectors";
import { getUser } from "ApplicationSelectors";
import { NotificationModel } from "models/Notification";
import { UserModel } from "models/User";

import Notification from "./Notification";

interface Props {
  loadNotifications: (id: number) => any;
  markAsSeen: (id: number) => any;
  notifications: NotificationModel[];
  user: UserModel;
}

class NotificationsProvider extends React.Component<Props> {
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
  notifications: getNotifications(state),
  user: getUser(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadNotifications: bindActionCreators(loadNotifications, dispatch),
  markAsSeen: bindActionCreators(markAsDisplayed, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationsProvider);
