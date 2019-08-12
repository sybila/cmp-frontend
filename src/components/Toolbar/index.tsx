import React from "react";

import MenuButton from "./MenuButton";

interface Props {}

interface State {
  isOpen: boolean;
}

class Toolbar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isOpen: false
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const { isOpen } = this.state;

    return (
      <div className={`toolbar${isOpen ? " open" : ""}`}>
        <div onClick={this.handleClick}>
          <MenuButton isOpen={isOpen} />
        </div>
      </div>
    );
  }
}

export default Toolbar;
