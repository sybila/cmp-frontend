import React from "react";
import { Message, Button } from "react-bulma-components";

interface Props {
  title: string;
  text: string;
}

class InboxItem extends React.PureComponent<Props> {
  render() {
    const { title, text } = this.props;
    return (
      <Message>
        <Message.Header>
          {title}
          <Button remove />
        </Message.Header>
        <Message.Body>
          {text}
        </Message.Body>
      </Message>
    );
  }
}

export default InboxItem;
