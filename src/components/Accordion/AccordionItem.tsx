import React from "react";

import { truncate } from "../../Helpers";

export interface Props {
  heading: string;
  body: any;
  isOpen?: boolean;
  onClick?: Function;
  index: number;
}

class AccordionItem extends React.PureComponent<Props> {
  render() {
    const { heading, body, isOpen, onClick, index } = this.props;

    return (
      <div className={`card${isOpen ? " show" : ""}`}>
        <div className="card-header noselect" onClick={() => onClick(index)}>
          <div className="mb-0">
            {truncate.apply(heading, [35, false])}
            <div className={`arrow${isOpen ? " up" : " down"}`}></div>
          </div>
        </div>
        <div className={`collapse${isOpen ? " show" : ""}`}>
          <div className="card-body">{body}</div>
        </div>
      </div>
    );
  }
}

export default AccordionItem;
