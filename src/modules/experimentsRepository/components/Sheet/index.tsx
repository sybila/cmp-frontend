import React from "react";
import { Table, Column, Cell } from "@blueprintjs/table";
import "@blueprintjs/table/lib/css/table.css";
import _ from "lodash";

import { ExperimentVariable, ExperimentVariableValue } from "models/Experiment";
import { hhmmss } from "utils/helpers";

interface Props {
  vars: ExperimentVariable[];
}

interface State {
  times: number[];
  mappedValues: {
    [key: number]: {
      [key: number]: ExperimentVariableValue;
    };
  };
}

class Sheet extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      times: [],
      mappedValues: {}
    };
  }

  get getTimes() {
    return this.props.vars
      .filter(variable => variable.values)
      .flatMap(variable =>
        variable.values ? variable.values.map(value => value.time) : []
      );
  }

  get getMappedValues() {
    let mapped = {};

    this.props.vars
      .filter(variable => variable.values)
      .forEach(variable => {
        let newVar = {};
        variable.values.forEach(val => (newVar[val.time] = val));
        mapped[variable.id] = newVar;
      });

    return mapped;
  }

  componentDidMount() {
    this.setState({
      times: this.getTimes,
      mappedValues: this.getMappedValues
    });
  }

  componentDidUpdate(prevProps) {
    if (!_.isEqual(prevProps.vars, this.props.vars)) {
      this.setState({
        times: this.getTimes,
        mappedValues: this.getMappedValues
      });
    }
  }

  cellRenderer(rowIndex: number, varId: number) {
    const { times, mappedValues } = this.state;
    const variable = mappedValues[varId];
    const time = times[rowIndex];

    return (
      <Cell>{variable && variable[time] ? variable[time].value : ""}</Cell>
    );
  }

  render() {
    const { vars } = this.props;
    const { times } = this.state;

    const columns = vars
      ? vars.map((_: ExperimentVariable, index) => (
          <Column
            key={index}
            name={_.name}
            cellRenderer={index => this.cellRenderer(index, _.id)}
          />
        ))
      : [];

    columns.unshift(
      <Column
        key="time-column"
        name="Time"
        cellRenderer={index => (
          <Cell>
            <>
              <strong>{hhmmss(times[index])}</strong>
            </>
          </Cell>
        )}
      />
    );

    return (
      <div style={{ height: "20rem" }}>
        <Table numRows={times.length}>{columns}</Table>
      </div>
    );
  }
}

export default Sheet;
