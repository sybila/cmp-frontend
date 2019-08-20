import React from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { Link, NavLink } from "react-router-dom";
import {
  faSignOutAlt,
  faUserCircle,
  faTools
} from "@fortawesome/free-solid-svg-icons";

import { UserModel } from "../../models/User";
import { AppState } from "reducers/GlobalReducer";
import { ItemType } from "../Dropdown";
import { ButtonLink } from "../Button";
import { toggleInbox, newNotifications } from "modules/administration/actions";
import NotificationsBell from "./NotificationsBell";
import User from "./User";
import { hasNews } from "modules/administration/selectors";
import { getUser } from "ApplicationSelectors";

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

    // TODO: Move to some kind of config
    const userDropdownItems = [
      {
        text: "Profile",
        to: "/profile",
        icon: faUserCircle
      },
      {
        text: "Settings",
        to: "/admin/settings",
        icon: faTools
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

    const navItems = [
      {
        text: "Home",
        to: "/",
        exact: true
      },
      {
        text: "Biochemical space",
        to: "/bsc"
      },
      {
        text: "Model repository",
        to: "/models-repo"
      },
      {
        text: "Experiments repository",
        to: "/experiments-repo"
      },
      {
        text: "CyanoNumbers",
        to: "/numbers"
      },
      {
        text: "Support",
        to: "/support"
      },
      {
        text: "About us",
        to: "/about-us"
      }
    ];

    const publicNavItems = [
      <Link className={"nav-link"} to={"/login"}>
        Sign in
      </Link>,
      <ButtonLink class={"nav-link"} to={"/register"}>
        Sign up
      </ButtonLink>
    ];

    const userNavItems = user
      ? [
          <User userDropdownItems={userDropdownItems} user={user} />,
          <NotificationsBell handleClick={this.handleBellClick} news={news} />
        ]
      : [];

    return (
      <nav className="navbar navbar-expand-md user-utils top-menu">
        <div className="mx-auto order-0">
          <Link className="navbar-brand" to="/">
            CMP
          </Link>
          {/* TODO: Hamburger menu for mobiles */}
          <button className="navbar-toggler" type="button">
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        <div className="navbar-collapse collapse w-100 order-1 order-md-0">
          <ul className="navbar-nav app-nav mr-auto">
            {navItems.map((item, i) => (
              <li className="nav-item">
                <NavLink
                  className={"nav-link"}
                  to={item.to}
                  exact={item.exact}
                  activeClassName={activeClassName}
                  key={`nav-item-${item.text}-${i}`}
                >
                  {item.text}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="navbar-collapse collapse w-25 order-3">
          <ul className="navbar-nav ml-auto">
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
