import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import onClickOutside from "react-onclickoutside";

import { AppState } from "reducers/GlobalReducer";
import { ToolbarItem as ToolbarItemType } from "modules/administration/reducers/ToolbarReducer";
import MenuButton from "./MenuButton";
import ToolbarItem from "./ToolbarItem";
import { UserModel } from "models/User";
import { getUser } from "ApplicationSelectors";

interface Props extends RouteComponentProps<any> {
  toolbarItems: {
    [key: string]: {
      id: string;
      items: ToolbarItemType[];
    };
  };

  user: UserModel;
}

interface State {
  isOpen: boolean;
}

class Toolbar extends React.Component<Props, State> {
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

  handleClickOutside(event: any) {
    this.state.isOpen && this.handleClick();
  }

  render() {
    const { isOpen } = this.state;
    const { toolbarItems, location, user } = this.props;

    const url = location.pathname.split("/");
    let renderItems: JSX.Element[];

    for (let i = 0; i < url.length; i++) {
      const name = url[i];
      if (toolbarItems[name] && toolbarItems[name].items) {
        renderItems = toolbarItems[name].items
          .filter(
            (item) =>
              !item.permission || (user && item.permission >= user.type.tier)
          )
          .map((item: ToolbarItemType) => (
            <ToolbarItem
              to={"/" + name + item.to}
              icon={item.icon}
              text={item.text}
              key={`tool-bar-item-${item.text}`}
            />
          ));
        break;
      }
    }

    return (
      <div className={`toolbar${isOpen ? " open" : ""}`}>
        <div onClick={this.handleClick}>
          <MenuButton isOpen={isOpen} />
        </div>
        <div className={"toolbar-items"}>{renderItems}</div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  toolbarItems: state.module_administration.toolbar,
  user: getUser(state),
});

export default withRouter(connect(mapStateToProps)(onClickOutside(Toolbar)));
