import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import moment from "moment";

import { moduleNames as experimentsNames } from "../../reducers/MainReducer";
import { AppState } from "reducers/GlobalReducer";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { getExperimentsObject } from "modules/experimentsRepository/selectors";
import { ByIdObject } from "models/GenericTypes";
import { Experiment } from "models/Experiment";
import { Link } from "react-router-dom";
import { ExperimentComponentProps } from "..";

interface Props extends ExperimentComponentProps {
  experimentsById: ByIdObject<Experiment>;
}

interface State {}

class ExperimentProtocolPage extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { experimentsById, match } = this.props;
    const currentExperiment: Experiment =
      experimentsById[match.params.experimentId];

    return currentExperiment ? (
      <>
        <BreadcrumbsItem
          to={`/${experimentsNames.url}/repository/detail/${currentExperiment.id}`}
        >
          Protocol
        </BreadcrumbsItem>
        <section className="section p-b-0">
          <div className="container">
            <div className="box ">
              <h4 className="title is-4 m-b-10">Protocol</h4>
              <p>
                {currentExperiment.protocol
                  ? currentExperiment.protocol
                  : "Experiment doesn't have a protocol."}
              </p>
            </div>
          </div>
        </section>
      </>
    ) : (
      <></>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  experimentsById: getExperimentsObject(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExperimentProtocolPage);
