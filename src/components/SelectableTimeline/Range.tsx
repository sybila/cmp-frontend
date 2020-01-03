import React, { useState, useEffect } from "react";
import Draggable, { DraggableData } from "react-draggable";

export type RangeType = { left: number; right: number };

interface RangeProps {
  onChange?: (range: RangeType) => void;
  defaultLeft?: number;
  defaultRight?: number;
}

const Range = (props: RangeProps) => {
  const defaultLeft = props.defaultLeft ? props.defaultLeft : 0;
  const defaultRight = props.defaultRight ? props.defaultRight : 0;

  const defaultSize: RangeType = {
    left: defaultLeft,
    right: defaultRight
  };

  const [range, setRange] = useState(defaultSize);

  useEffect(() => {}, [range]);

  const handleLeftDrag = (e: any, data: DraggableData) => {
    setRange({ ...range, left: data.x });
  };

  const handleRightDrag = (e: any, data: DraggableData) => {
    setRange({ ...range, right: data.x });
  };

  const handleChange = () => {
    const { onChange } = props;
    onChange && onChange(range);
  };

  const leftOffset = range.left;
  const width = range.right - range.left;

  return (
    <div className="st-range">
      <div
        className="st-range-background"
        style={{
          transform: `translateX(${leftOffset}px) scaleX(${width})`
        }}
      ></div>
      <Draggable
        axis="x"
        bounds="#selectable-timeline-line"
        onDrag={handleLeftDrag}
        defaultPosition={{ x: defaultLeft, y: 0 }}
        onStop={handleChange}
      >
        <div className="st-point"></div>
      </Draggable>
      <Draggable
        axis="x"
        bounds="#selectable-timeline-line"
        onDrag={handleRightDrag}
        onStop={handleChange}
        defaultPosition={{ x: defaultRight, y: 0 }}
      >
        <div className="st-point"></div>
      </Draggable>
    </div>
  );
};

export default Range;
