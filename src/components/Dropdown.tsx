import React, { FocusEvent } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export enum ItemType {
  link = "link",
  divider = "divider",
}

export interface Item {
  text: string;
  icon?: any;
  type?: ItemType;
  to?: string;
  onClick?: Function;
  active?: boolean;
  disabled?: boolean;
  class?: string;
}

interface Props {
  children: any;
  items: Item[];
}

interface State {
  show: boolean;
}

class Dropdown extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.handleMouseEvent = this.handleMouseEvent.bind(this);
    this.handleBlurEvent = this.handleBlurEvent.bind(this);
    this.hasFocus = this.hasFocus.bind(this);

    this.state = {
      show: false,
    };
  }

  private dropdown: any;

  componentDidMount() {
    // handles mouse events like click and dblclick
    document.addEventListener("mouseup", this.handleMouseEvent);
    // handles tabbing out of
    this.dropdown.addEventListener("focusout", this.handleBlurEvent);
  }

  componentWillUnmount() {
    document.removeEventListener("mouseup", this.handleMouseEvent);
    this.dropdown.removeEventListener("focusout", this.handleBlurEvent);
  }

  hasFocus(target: EventTarget) {
    // React ref callbacks pass `null` when a component unmounts, so guard against `this.dropdown` not existing
    if (!this.dropdown) {
      return false;
    }
    var dropdownHasFocus = false;
    var nodeIterator = document.createNodeIterator(
      this.dropdown,
      NodeFilter.SHOW_ELEMENT
    );
    var node: any;

    while ((node = nodeIterator.nextNode())) {
      if (node === target) {
        dropdownHasFocus = true;
        break;
      }
    }

    return dropdownHasFocus;
  }

  handleBlurEvent(e: FocusEvent) {
    var dropdownHasFocus = this.hasFocus(e.relatedTarget);

    if (!dropdownHasFocus) {
      this.setState({
        show: false,
      });
    }
  }

  handleMouseEvent(e: any) {
    var dropdownHasFocus = this.hasFocus(e.target);

    if (!dropdownHasFocus) {
      this.setState({
        show: false,
      });
    }
  }

  toggleDropdown() {
    this.setState({
      show: !this.state.show,
    });
  }

  render() {
    const { show } = this.state;
    const { children, items } = this.props;

    // REVIEW: Not the best solution, needs a bit of DRYing
    return (
      <div
        className={`dropdown${show ? " show" : ""}`}
        ref={(dropdown) => (this.dropdown = dropdown)}
      >
        <div className={"dropdown-button"} onClick={this.toggleDropdown}>
          {children}
        </div>
        <div className={`dropdown-menu${show ? " show" : ""}`}>
          {items &&
            items.map((item, i) =>
              item.type === ItemType.divider ? (
                <div
                  key={`dropdown-${i}-${item.text}`}
                  className="dropdown-divider"
                ></div>
              ) : (
                <Link
                  key={`dropdown-${i}-${item.text}`}
                  to={item.to || "#"}
                  onClick={(e) => {
                    this.setState({ show: false });
                    item.onClick && item.onClick();
                  }}
                  className={`dropdown-item${
                    item.class ? " " + item.class : ""
                  }${item.disabled ? "disabled" : ""}`}
                >
                  {item.icon && <FontAwesomeIcon icon={item.icon} />}
                  {item.text}
                </Link>
              )
            )}
        </div>
      </div>
    );
  }
}

export default Dropdown;
