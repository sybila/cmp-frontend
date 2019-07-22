import React from "react";

interface Props {
  timeRemaining: number;
}

class TimeBar extends React.PureComponent<Props> {
  render() {
    const { timeRemaining } = this.props;
    console.log(timeRemaining);
    return (
      <div className={"time-bar"}>
        <div
          className={"time-remaining"}
          style={{ animationDuration: `${timeRemaining}s` }}
        ></div>
      </div>
    );
  }
}

export default TimeBar;
