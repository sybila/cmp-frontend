import React from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { Link, NavLink } from "react-router-dom";
import {
  faSignOutAlt,
  faUserCircle,
  faTools,
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
import logo from "assets/logo.svg";
import { logout } from "ApplicationActions";

import { moduleNames as bioQuantitiesNames } from "modules/bioQuantities/reducers/MainReducer";
import { moduleNames as modelsNames } from "modules/modelsRepository/reducers/MainReducer";
import { moduleNames as experimentsNames } from "modules/experimentsRepository/reducers/MainReducer";

interface Props {
  user: UserModel;
  toggleInbox?: () => void;
  newNotifications: (news: boolean) => void;
  logout: typeof logout;
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
        icon: faUserCircle,
      },
      {
        text: "Settings",
        to: "/admin/settings",
        icon: faTools,
      },
      {
        text: "",
        type: ItemType.divider,
      },
      {
        text: "Logout",
        onClick: this.props.logout,
        icon: faSignOutAlt,
      },
    ];

    const navItems = [
      // {
      //   text: "Biochemical space",
      //   to: "/bsc"
      // },
      {
        text: "Models",
        to: `/${modelsNames.url}`,
      },
      {
        text: "Experiments",
        to: `/${experimentsNames.url}`,
      },
      {
        text: "BioQuantities",
        to: `/${bioQuantitiesNames.url}`,
      },
      {
        text: "About us",
        to: "/page/about-us",
      },
    ];

    const publicNavItems = [
      <Link className={"nav-link"} to={"/login"}>
        Sign in
      </Link>,
      <ButtonLink class={"nav-link"} to={"/register"}>
        Sign up
      </ButtonLink>,
    ];

    const userNavItems = user
      ? [
          <User userDropdownItems={userDropdownItems} user={user} />,
          <NotificationsBell handleClick={this.handleBellClick} news={news} />,
        ]
      : [];

    return (
      <nav className={"top-menu navbar is-white"}>
        <div className={"navbar-brand"}>
          <div className={"navbar-item"}>
            <Link to="/">
              <img alt="CMP" src={logo} />
            </Link>
          </div>
        </div>
        <a role="button" className="navbar-burger burger" aria-label="menu">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>

        <div className="navbar-menu">
          <div className="navbar-start">
            {navItems.map((item, i) => (
              <div className="navbar-item is-hoverable" key={`topmenu-${i}`}>
                <NavLink
                  className={"nav-link"}
                  to={item.to}
                  activeClassName={activeClassName}
                  key={`nav-item-${item.text}-${i}`}
                >
                  {item.text}
                </NavLink>
              </div>
            ))}
          </div>
          <div className="navbar-end">
            {user
              ? userNavItems.map((item, i) => (
                  <div key={`nav-item-${i}`}>{item}</div>
                ))
              : publicNavItems.map((item, i) => (
                  <div className="navbar-item" key={`nav-item-${i}`}>
                    {item}
                  </div>
                ))}
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  news: hasNews(state),
  user: getUser(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggleInbox: bindActionCreators(toggleInbox, dispatch),
  newNotifications: bindActionCreators(newNotifications, dispatch),
  logout: bindActionCreators(logout, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserUtils);
