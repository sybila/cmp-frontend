import React from "react";
import Jdenticon from "react-jdenticon";

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
      isOpen: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    const { userDropdownItems, user } = this.props;
    const { isOpen } = this.state;

    return (
      <div className={"user-menu-item"} onClick={this.handleClick}>
        <Dropdown items={userDropdownItems}>
          {user.picture ? (
            <img src={user.picture} alt="avatar" />
          ) : (
            <Jdenticon size="48" value={`${user.name} ${user.surname}`} />
          )}
          <div className={"info-column"}>
            <span className={"user-name"}>
              {user.name} {user.surname}
            </span>
            <span className={"user-role"}>{user.type.name}</span>
          </div>
          <div className={`arrow ${isOpen ? "up" : "down"}`}></div>
        </Dropdown>
      </div>
    );
  }
}

export default User;
