import React, { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

type Item = {
  name: string;
  id: string | number;
  [key: string]: any;
};

export interface PanelTab {
  id: number;
  caption: string;
}

interface Props {
  items: Item[];
  activeId?: number;
  itemClick?: (id: number | string) => void;
  search: (query: string) => void;
  searchQuery: string;
  title: string;
  emptyMsg?: string;

  tabs?: PanelTab[];
  onTabClick?: (id: number) => void;
}

const PanelBlock = (props: Props) => {
  const [activePanel, setActivePanel] = useState(0);

  const {
    title,
    emptyMsg,
    items,
    activeId,
    itemClick,
    search,
    searchQuery,
    tabs,
    onTabClick,
  } = props;

  const handlePanelClick = useCallback(
    (id: number, i: number) => {
      onTabClick && onTabClick(id);
      setActivePanel(i);
    },
    [onTabClick]
  );

  return (
    <nav className="panel is-primary">
      <p className="panel-heading">{title}</p>
      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            className="input"
            type="text"
            placeholder="Search"
            onChange={(e) => search(e.currentTarget.value)}
            value={searchQuery}
          />
          <span className="icon is-left">
            <FontAwesomeIcon icon={faSearch} />
          </span>
        </p>
      </div>
      {tabs && tabs.length ? (
        <p className="panel-tabs">
          {tabs.map((tab, index) => (
            <a
              className={activePanel === index ? "is-active" : ""}
              onClick={() => handlePanelClick(tab.id, index)}
            >
              {tab.caption}
            </a>
          ))}
        </p>
      ) : (
        ""
      )}
      <div className="panel-items-block">
        {items && items.length ? (
          items.map((item: Item) => (
            <label
              className={`panel-block${activeId === item.id ? " active" : ""}`}
              key={`experiments-panel-${item.id}`}
              onClick={() => itemClick(item.id)}
            >
              {item.name}
            </label>
          ))
        ) : emptyMsg ? (
          <div className="notification is-primary is-light">{emptyMsg}</div>
        ) : (
          ""
        )}
      </div>
      <div className="panel-block">
        <button
          className="button is-primary is-outlined is-fullwidth"
          onClick={() => search("")}
        >
          Reset search
        </button>
      </div>
    </nav>
  );
};

export default PanelBlock;
