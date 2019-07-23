import React from "react";
import { Link } from "react-router-dom";

import { UserModel } from "../../models/User";

interface Props {
  user?: UserModel;
}

class UserUtils extends React.Component<Props> {
  render() {
    const { user } = this.props;
    return (
      <ul className={"user-utils justify-content-end nav"}>
        {user && (
          <li className={"nav-item"}>
            <Link className={"nav-link"} to={"/profile"}>
              {user.username}
            </Link>
          </li>
        )}
        <li className={"nav-item"}>
          <Link className={"nav-link"} to={"/login"}>
            {user ? "Logout" : "Sign in"}
          </Link>
        </li>
      </ul>
    );
  }
}

export default UserUtils;
