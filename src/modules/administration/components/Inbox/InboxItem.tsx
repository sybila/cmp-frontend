import React from "react";

interface Props {
  title: string;
  text: string;
}

class InboxItem extends React.PureComponent<Props> {
  render() {
    const { title, text } = this.props;
    return (
      <div className={"inbox-item"}>
        <div className={"title"}>{title}</div>
        <div className={"text"}>{text}</div>
      </div>
    );
  }
}

export default InboxItem;
