import React from "react";
import { Table, Column } from "@blueprintjs/table";
import "@blueprintjs/table/lib/css/table.css";
import { ExperimentVariable } from "models/Experiment";

interface Props {
  vars: ExperimentVariable[];
}

class Sheet extends React.PureComponent<Props> {
  render() {
    const { vars } = this.props;
    const columns = vars ? vars.map((_: ExperimentVariable, index) => (
      <Column key={index} name={_.name} />
    )) : [];

    return (
      <Table numRows={10}>
        {columns}
      </Table>
    );
  }
}

export default Sheet;
