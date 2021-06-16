import React from "react";

interface Props {
  title: string;
  text: string;
  onClose: () => void;
}

class InboxItem extends React.PureComponent<Props> {
  render() {
    const { title, text, onClose } = this.props;
    return (
      <article className="message">
        <div className="message-header">
          {title}
          <button
            className="delete"
            aria-label="delete"
            onClick={onClose}
          ></button>
        </div>
        <div className="message-body">{text}</div>
      </article>
    );
  }
}

export default InboxItem;
