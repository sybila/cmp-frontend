import React from "react";
import { NavLink } from "react-router-dom";

interface Props {}

const ProfileNav = (props: Props) => {
  const activeClassName = "active";
  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <NavLink
          to={`/profile/`}
          activeClassName={activeClassName}
          className="nav-link"
          exact
        >
          Profile
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          to={`/profile/edit`}
          activeClassName={activeClassName}
          className="nav-link"
        >
          Edit
        </NavLink>
      </li>
    </ul>
  );
};

export default ProfileNav;
