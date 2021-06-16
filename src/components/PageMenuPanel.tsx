import React from "react";
import { NavLink } from "react-router-dom";

interface Props {
  basePath?: string;
  items: {
    caption: string;
    to: string;
    exact?: boolean;
  }[];
}

const PageMenuPanel = (props: Props) => {
  const { items, basePath } = props;

  return (
    <nav className="navbar menu-panel">
      <div className="navbar-menu">
        <div className="navbar-start">
          {items.map((item, i) => (
            <NavLink
              exact={item.exact}
              to={`${basePath}${item.to}`}
              key={`page-menu-panel-${i}`}
              className="navbar-item"
            >
              {item.caption}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default PageMenuPanel;
