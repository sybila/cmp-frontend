import React from "react";
import Sheet from "../../../components/Sheet";
import { AppState } from "reducers/GlobalReducer";
import { ExperimentVariable } from "models/Experiment";
import { getVarsByIdObject } from "modules/experimentsRepository/selectors";
import { connect } from "react-redux";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";

import { moduleNames as experimentsNames } from "../../../reducers/MainReducer";
import { RouteComponentProps } from "react-router-dom";
import { Dispatch, bindActionCreators } from "redux";
import { loadExperimentVariable } from "modules/experimentsRepository/actions";

type RouteParams = {
  variableId?: string;
  experimentId?: string;
};

interface Props extends RouteComponentProps<RouteParams> {
  variables: ExperimentVariable[];
  loadVariableDetails: typeof loadExperimentVariable;
}

class VarDataPage extends React.PureComponent<Props> {
  componentDidMount() {
    const { variables, match, loadVariableDetails } = this.props;
    const { variableId, experimentId } = match.params;

    const currentVar = variables[variableId];
    if (!currentVar || !currentVar.values) {
      loadVariableDetails(experimentId, variableId);
    }
  }

  render() {
    const { variables, match } = this.props;

    const currentVar: ExperimentVariable = variables[match.params.variableId];
    return (
      <>
        <BreadcrumbsItem
          to={`/${experimentsNames.url}/repository/detail/:experimentId/variables/:variableId/data`}
        >
          {currentVar.name}
        </BreadcrumbsItem>
        <section className="section">
          <div className="container">
            <div className="box">
              <div className="box-heading m-b-30">
                <h4 className="title is-4 m-b-10">{currentVar.name}</h4>
                <span>type: {currentVar.type} | </span>
                <span>code: {currentVar.code}</span>
              </div>
              <Sheet vars={[currentVar]} />
            </div>
          </div>
        </section>
      </>
    );
  }
}

const mapStateToProps = (state: AppState, ownProps) => ({
  variables: getVarsByIdObject(state, ownProps.match.params.experimentId)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadVariableDetails: bindActionCreators(loadExperimentVariable, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(VarDataPage);
