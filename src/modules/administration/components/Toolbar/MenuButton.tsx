import React from "react";

interface Props {
  isOpen?: boolean;
}

class MenuButton extends React.Component<Props> {
  render() {
    const { isOpen } = this.props;

    return (
      <div className={`hamburger-menu-btn${isOpen ? " open" : ""}`}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    );
  }
}

export default MenuButton;
