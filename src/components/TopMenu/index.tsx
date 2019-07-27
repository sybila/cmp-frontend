import React from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { Link, NavLink } from "react-router-dom";
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
import { getUser } from "../../selectors/userSelectors";

interface Props {
  user: UserModel;
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
    const { user, news } = this.props;
    const activeClassName = "active";

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
      <nav className="navbar navbar-expand-md user-utils top-menu">
        <div className="navbar-collapse collapse w-100 order-1 order-md-0">
          <ul className="navbar-nav mr-auto">
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
        </div>
        <div className="mx-auto order-0">
          <Link className="navbar-brand mx-auto" to="/">
            CMP
          </Link>
          {/* TODO: Hamburger menu for mobiles */}
          <button className="navbar-toggler" type="button">
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        <div className="navbar-collapse collapse w-100 order-3">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink
                className={"nav-link"}
                to={"/"}
                exact
                activeClassName={activeClassName}
              >
                Home
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  news: hasNews(state),
  user: getUser(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggleInbox: bindActionCreators(toggleInbox, dispatch),
  newNotifications: bindActionCreators(newNotifications, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserUtils);
