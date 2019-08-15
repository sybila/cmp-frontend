import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter, NavLink } from "react-router-dom";

import { AppState } from "../../reducers/globalReducer";
import { ToolbarItem as ToolbarItemType } from "../../reducers/toolbarReducer";
import MenuButton from "./MenuButton";
import ToolbarItem from "./ToolbarItem";

interface Props extends RouteComponentProps<any> {
  toolbarItems: {
    [key: string]: {
      id: string;
      items: ToolbarItemType[];
    };
  };
}

interface State {
  isOpen: boolean;
}

class Toolbar extends React.Component<Props, State> {
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
    const { isOpen } = this.state;
    const { toolbarItems, location } = this.props;

    const url = location.pathname.split("/");
    let renderItems: JSX.Element[];

    for (let i = 0; i < url.length; i++) {
      const name = url[i];
      if (toolbarItems[name] && toolbarItems[name].items) {
        renderItems = toolbarItems[name].items.map((item: ToolbarItemType) => (
          <ToolbarItem
            to={"/" + name + item.to}
            icon={item.icon}
            text={item.text}
            isText={isOpen}
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
  toolbarItems: state.toolbar
});

export default withRouter(connect(mapStateToProps)(Toolbar));
