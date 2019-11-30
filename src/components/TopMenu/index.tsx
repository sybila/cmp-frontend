import React from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { Link, NavLink } from "react-router-dom";
import {
  faSignOutAlt,
  faUserCircle,
  faTools
} from "@fortawesome/free-solid-svg-icons";
import { Navbar } from "react-bulma-components";

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
      <Navbar color={"white"} className={"top-menu"}>
          <Navbar.Brand>
            <Navbar.Item renderAs="div">
              <Link to="/">
                <img alt="CMP" src={logo} />
              </Link>
            </Navbar.Item>
          </Navbar.Brand>
          <Navbar.Burger />

        <Navbar.Menu>
          <Navbar.Container>
              {navItems.map((item, i) => (
                <Navbar.Item key={`topmenu-${i}`} renderAs="div" hoverable>
                  <NavLink
                    className={"nav-link"}
                    to={item.to}
                    exact={item.exact}
                    activeClassName={activeClassName}
                    key={`nav-item-${item.text}-${i}`}
                  >
                    {item.text}
                  </NavLink>
                </Navbar.Item>
              ))}
          </Navbar.Container>
          <Navbar.Container position="end">
            {user
                ? userNavItems.map((item, i) => (
                    <div key={`nav-item-${i}`}>
                      {item}
                    </div>
                  ))
                : publicNavItems.map((item, i) => (
                    <Navbar.Item renderAs="div" key={`nav-item-${i}`}>
                      {item}
                    </Navbar.Item>
                  ))}
          </Navbar.Container>
        </Navbar.Menu>
      </Navbar>
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
