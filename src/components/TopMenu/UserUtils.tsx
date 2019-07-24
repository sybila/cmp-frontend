import React from "react";
import { Link } from "react-router-dom";

import { UserModel } from "../../models/User";
import Dropdown, { ItemType } from "../Dropdown";

interface Props {
  user?: UserModel;
}

class UserUtils extends React.Component<Props> {
  render() {
    const { user } = this.props;

    const userDropdownItems = [
      {
        text: "Profile",
        to: "/profile"
      },
      {
        text: "",
        type: ItemType.divider
      },
      {
        text: "Logout",
        to: "/login"
      }
    ];

    return (
      <ul className={"user-utils justify-content-end nav"}>
        {user ? (
          <li className={"nav-item"}>
            <Dropdown text={user.username} items={userDropdownItems} />
          </li>
        ) : (
          <li className={"nav-item"}>
            <Link className={"nav-link"} to={"/login"}>
              Sign in
            </Link>
          </li>
        )}
      </ul>
    );
  }
}

export default UserUtils;
