import React from "react";
import { Message, Button } from "react-bulma-components";

interface Props {
  title: string;
  text: string;
  onClose: () => void;
}

class InboxItem extends React.PureComponent<Props> {
  render() {
    const { title, text, onClose } = this.props;
    return (
      <Message>
        <Message.Header>
          {title}
          <Button remove onClick={onClose}/>
        </Message.Header>
        <Message.Body>
          {text}
        </Message.Body>
      </Message>
    );
  }
}

export default InboxItem;
