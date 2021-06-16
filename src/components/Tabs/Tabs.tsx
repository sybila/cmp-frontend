import React, { ReactChild, useEffect, useState } from "react";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface TabProps {
  name: string;
  caption: string;
  icon?: IconDefinition;
  children: ReactChild;
}

type Tab = React.ReactElement<TabProps>;

interface Props {
  onClick?: (name: string) => void;
  defaultTab?: string;
  align?: "centered" | "right";
  children: Tab[];
}

const Tabs = (props: Props) => {
  const [active, setActive] = useState(0);
  const tabs = props.children
    .filter((tab) => tab.props)
    .map((tab: Tab, index: number) => {
      return (
        <li
          className={index === active ? "is-active" : ""}
          onClick={() => handleClick(index)}
          key={`tab-${tab.props.name}-${index}`}
        >
          <a>
            {tab.props.icon && (
              <span className="icon is-small">
                <FontAwesomeIcon icon={tab.props.icon} />
              </span>
            )}
            <span>{tab.props.caption}</span>
          </a>
        </li>
      );
    });

  useEffect(() => {
    if (props.defaultTab) {
      const i = props.children.findIndex(
        (tab) => tab.props.name === props.defaultTab
      );
      i !== -1 && setActive(i);
    }
  }, [props.defaultTab]);

  const handleClick = (id: number) => {
    setActive(id);
    props.onClick && props.onClick(props.children[id].props.name);
  };

  return (
    <div className="container">
      <div className={`tabs${props.align ? " is-" + props.align : ""}`}>
        <ul>{tabs}</ul>
      </div>
      {props.children[active].props.children}
    </div>
  );
};

export default Tabs;
