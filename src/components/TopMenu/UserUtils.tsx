import React from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import { faSignOutAlt, faUserCircle } from "@fortawesome/free-solid-svg-icons";

import { UserModel } from "../../models/User";
import { AppState } from "../../reducers/globalReducer";
import Dropdown, { ItemType } from "../Dropdown";
import {
  toggleInbox,
  newNotifications
} from "../../actions/notificationActions";
import NotificationsBell from "./NotificationsBell";
import { hasNews } from "../../selectors/notificationsSelectors";

interface Props {
  user?: UserModel;
  toggleInbox?: () => void;
  newNotifications: (news: boolean) => void;
  news: boolean;
}

class UserUtils extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.handleBellClick = this.handleBellClick.bind(this);
  }

  handleBellClick() {
    const { newNotifications, toggleInbox } = this.props;
    toggleInbox();
    newNotifications(false);
  }

  render() {
    const { user, toggleInbox, news } = this.props;

    const userDropdownItems = [
      {
        text: "Profile",
        to: "/profile",
        icon: faUserCircle
      },
      {
        text: "",
        type: ItemType.divider
      },
      {
        text: "Logout",
        to: "/login",
        icon: faSignOutAlt
      }
    ];

    const publicNavItems = [
      <Link className={"nav-link"} to={"/login"}>
        Sign in
      </Link>,
      <Link className={"nav-link"} to={"/register"}>
        Sign up
      </Link>
    ];

    const userNavItems = user
      ? [
          <Dropdown text={user.username} items={userDropdownItems} />,
          <NotificationsBell handleClick={this.handleBellClick} news={news} />
        ]
      : [];

    return (
      <ul className={"user-utils justify-content-start nav"}>
        {user
          ? userNavItems.map((item, i) => (
              <li className={"nav-item"} key={`nav-item-${i}`}>
                {item}
              </li>
            ))
          : publicNavItems.map((item, i) => (
              <li className={"nav-item"} key={`nav-item-${i}`}>
                {item}
              </li>
            ))}
      </ul>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  news: hasNews(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggleInbox: bindActionCreators(toggleInbox, dispatch),
  newNotifications: bindActionCreators(newNotifications, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserUtils);
