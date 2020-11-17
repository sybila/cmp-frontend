import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

type Item = {
  name: string;
  id: string | number;
  [key: string]: any;
};

interface Props {
  items: Item[];
  activeId?: number;
  itemClick?: (id: number | string) => void;
  search: (query: string) => void;
  searchQuery: string;
  title: string;
  emptyMsg?: string;
}

const PanelBlock = (props: Props) => {
  const {
    title,
    emptyMsg,
    items,
    activeId,
    itemClick,
    search,
    searchQuery,
  } = props;

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
