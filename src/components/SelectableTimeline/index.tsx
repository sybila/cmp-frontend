import React, { useState, createRef, useEffect } from "react";
import Range, { RangeType } from "./Range";
import { hhmmss } from "utils/helpers";

interface SelectableTimelineProps {
  onChange?: (ranges: RangeType[]) => void;
  formatter?: (positon: number) => string;
  lastTimeStamp: number;
}

const SelectableTimeline = (props: SelectableTimelineProps) => {
  let lineRef = createRef<HTMLDivElement>();
  const [ranges, setRanges] = useState([]);
  const [fullWidth, setFullWidth] = useState(0);

  const converter = (position: number) => {
    const percentage = position / fullWidth;
    return percentage * props.lastTimeStamp;
  };

  const formatter = (position: number) => {
    return hhmmss(converter(position));
  };

  useEffect(() => {
    // TODO: change value 20 to .st-point clientWidth
    const clientWidth = lineRef.current.clientWidth - 20;
    setFullWidth(clientWidth);
    setRanges([{ left: 0, right: clientWidth }]);
  }, []);

  const handleRangeChange = (index: number, range: RangeType) => {
    const newRanges = [...ranges];
    newRanges[index] = range;
    setRanges(newRanges);

    // TODO: return ranges in specified scare (hours || seconds etc.)
    props.onChange &&
      props.onChange(
        newRanges.map(range => ({
          left: converter(range.left),
          right: converter(range.right)
        }))
      );
  };

  return (
    <div className="selectable-timeline">
      <div className="st-line" id="selectable-timeline-line" ref={lineRef}>
        {ranges.map((range, index) => (
          <Range
            defaultLeft={range.left}
            defaultRight={range.right}
            formatter={formatter}
            key={`range-${index * Math.random()}`}
            onChange={boundaries => handleRangeChange(index, boundaries)}
          />
        ))}
      </div>
    </div>
  );
};

export default SelectableTimeline;
