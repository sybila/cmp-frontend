import React from "react";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";

import { moduleNames as experimentsNames } from "../../reducers/MainReducer";
import ProgressNav from "components/ProgressNav";

class AddExperiment extends React.PureComponent {
  render() {
    return (
      <>
        <BreadcrumbsItem to={`/${experimentsNames.url}/detail`}>
          New experiment
        </BreadcrumbsItem>
        <div className="section">
          <div className="container">
            <h2 className="title is-2">New experiment</h2>
            <ProgressNav />
          </div>
        </div>
      </>
    );
  }
}

export default AddExperiment;
