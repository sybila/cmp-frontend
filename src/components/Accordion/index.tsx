import React from "react";

import AccordionItem, { Props as AccordionItemProps } from "./AccordionItem";

interface Props {
  items: {
    heading: string;
    body: any;
  }[];
  className?: string;
}

interface State {
  itemsState: boolean[];
}

class Accordion extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      itemsState: []
    };

    this.toggleItemHandle = this.toggleItemHandle.bind(this);
  }

  toggleItemHandle(index: number) {
    this.setState(prev => ({
      itemsState: prev.itemsState.map((value, i) =>
        i === index ? !value : value
      )
    }));
  }

  initItemState(items: any[], value) {
    return new Array(items.length).fill(value);
  }

  componentDidMount() {
    const { items } = this.props;
    this.setState({
      itemsState: this.initItemState(items, false)
    });
  }

  componentDidUpdate(prevProps: Props) {
    const { items } = this.props;

    if (items.length && prevProps.items.length !== items.length) {
      this.setState({
        itemsState: this.initItemState(items, false)
      });
    }
  }

  render() {
    const { itemsState } = this.state;
    const { items, className } = this.props;

    return (
      <div className={`collapsible-accordion ${className}`}>
        {items.length > 0 ? (
          items.map((item: AccordionItemProps, i) => (
            <AccordionItem
              {...item}
              isOpen={itemsState[i]}
              onClick={this.toggleItemHandle}
              key={`${item.heading}-${i}`}
              index={i}
            />
          ))
        ) : (
          <div className="card">
            <div className="card-header noselect">Loading...</div>
          </div>
        )}
      </div>
    );
  }
}

export default Accordion;
