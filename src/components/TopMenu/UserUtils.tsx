import React from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import { faSignOutAlt, faUserCircle } from "@fortawesome/free-solid-svg-icons";

import { UserModel } from "../../models/User";
import { AppState } from "../../reducers/globalReducer";
import Dropdown, { ItemType } from "../Dropdown";
import { toggleInbox } from "../../actions/notificationActions";
import NotificationsBell from "./NotificationsBell";

interface Props {
  user?: UserModel;
  toggleInbox?: () => void;
}

class UserUtils extends React.Component<Props> {
  render() {
    const { user, toggleInbox } = this.props;

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
          <NotificationsBell handleClick={toggleInbox} />
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

const mapStateToProps = (state: AppState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggleInbox: bindActionCreators(toggleInbox, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserUtils);
