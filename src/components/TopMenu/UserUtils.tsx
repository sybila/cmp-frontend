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
          ? userNavItems.map(item => <li className={"nav-item"}>{item}</li>)
          : publicNavItems.map(item => <li className={"nav-item"}>{item}</li>)}
      </ul>
    );
  }
}

export default UserUtils;
