import React from "react";

type MessageType =
  | "dark"
  | "primary"
  | "link"
  | "info"
  | "success"
  | "warning"
  | "danger";

const Message = (props: { type?: MessageType; children: any }) => {
  const { type, children } = props;

  return (
    <article className={`message ${type ? "is-" + type : ""}`}>
      <div className="message-body">{children}</div>
    </article>
  );
};

export default Message;
