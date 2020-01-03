import React, { useState, createRef, useEffect } from "react";
import Range, { RangeType } from "./Range";

interface SelectableTimelineProps {
  onChange?: (ranges: RangeType[]) => void;
}

const SelectableTimeline = (props: SelectableTimelineProps) => {
  let lineRef = createRef<HTMLDivElement>();
  const [ranges, setRanges] = useState([]);

  useEffect(() => {
    // TODO: change value 20 to .st-point clientWidth
    setRanges([{ left: 0, right: lineRef.current.clientWidth - 20 }]);
  }, []);

  const handleRangeChange = (index: number, range: RangeType) => {
    const newRanges = [...ranges];
    newRanges[index] = range;
    setRanges(newRanges);

    // TODO: return ranges in specified scare (hours || seconds etc.)
    props.onChange(newRanges);
  };

  return (
    <div className="selectable-timeline">
      <div className="st-line" id="selectable-timeline-line" ref={lineRef}>
        {ranges.map((range, index) => (
          <Range
            defaultLeft={range.left}
            defaultRight={range.right}
            onChange={boundaries => handleRangeChange(index, boundaries)}
          />
        ))}
      </div>
    </div>
  );
};

export default SelectableTimeline;
