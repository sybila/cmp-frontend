import React from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";

import { AppState } from "../../reducers/globalReducer";
import {
  loadNotifications,
  markAsSeen
} from "../../actions/notificationActions";
import { getNotificationsById } from "../../selectors/notificationsSelectors";
import { NotificationModel } from "../../models/Notification";

import Notification from "./Notification";

interface Props {
  loadNotifications: (id: number) => any;
  markAsSeen: (id: number) => any;
  notifications: NotificationModel[];
}

class NotificationsProvider extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    // TODO: Valid ID
    this.props.loadNotifications(99);
  }

  render() {
    const { notifications } = this.props;

    const nodes = notifications.map(i => {
      return <Notification message={i.message}></Notification>;
    });
    return (
      <div className={"notifications-container"}>
        {/* TEMP: For notification testing purposes */}
        <button onClick={() => this.props.loadNotifications(99)}>
          Add notification
        </button>
        {nodes}
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  notifications: getNotificationsById(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadNotifications: bindActionCreators(loadNotifications, dispatch),
  markAsSeen: bindActionCreators(markAsSeen, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationsProvider);
