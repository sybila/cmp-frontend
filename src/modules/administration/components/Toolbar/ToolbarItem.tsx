import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconName } from "@fortawesome/fontawesome-svg-core";

import { ToolbarItem as ToolbarItemProps } from "../../reducers/ToolbarReducer";

interface Props extends ToolbarItemProps {
  isText?: boolean;
}

class ToolbarItem extends React.Component<Props> {
  render() {
    const { text, to, icon } = this.props;

    return (
      <div className={"toolbar-item"}>
        <NavLink to={to} exact>
          <FontAwesomeIcon icon={icon as IconName} />
          <span className="caption">{text}</span>
        </NavLink>
      </div>
    );
  }
}

export default ToolbarItem;
