import React from "react";

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
      <div className="card">
        <div className="card-header noselect" onClick={() => onClick(index)}>
          <div className="mb-0">{heading}</div>
        </div>
        <div id="collapseOne" className={`collapse${isOpen ? " show" : ""}`}>
          <div className="card-body">{body}</div>
        </div>
      </div>
    );
  }
}

export default AccordionItem;
