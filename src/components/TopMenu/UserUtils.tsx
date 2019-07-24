import React from "react";
import { Link } from "react-router-dom";
import { faSignOutAlt, faUserCircle } from "@fortawesome/free-solid-svg-icons";

import { UserModel } from "../../models/User";
import Dropdown, { ItemType } from "../Dropdown";
import NotificationsBell from "./NotificationsBell";

interface Props {
  user?: UserModel;
}

class UserUtils extends React.Component<Props> {
  render() {
    const { user } = this.props;

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
          <NotificationsBell />
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

export default UserUtils;
