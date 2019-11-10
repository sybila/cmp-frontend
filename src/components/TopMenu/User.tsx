import React from "react";
import profilePlaceholder from "../../assets/profile-placeholder.png";

import Dropdown, { Item } from "../Dropdown";
import { UserModel } from "../../models/User";

interface Props {
  userDropdownItems: Item[];
  user: UserModel;
}

interface State {
  isOpen: boolean;
}

class User extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isOpen: false
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const { userDropdownItems, user } = this.props;
    const { isOpen } = this.state;

    return (
      <div className={"user-menu-item"} onClick={this.handleClick}>
        <Dropdown items={userDropdownItems}>
          <a className="nav-link" href="/">
            <img
              src={user.picture ? user.picture : profilePlaceholder}
              className="m-x-auto img-fluid rounded-circle profile-picture"
              alt="avatar"
            />
            <div className={"info-column"}>
              <span className={"user-name"}>
                {user.firstName} {user.lastName}
              </span>
              <span className={"user-role"}>
                {/* TODO: Change when permissions are resolved */}
                Administrator
              </span>
            </div>
            <div className={`arrow ${isOpen ? "up" : "down"}`}></div>
          </a>
        </Dropdown>
      </div>
    );
  }
}

export default User;
