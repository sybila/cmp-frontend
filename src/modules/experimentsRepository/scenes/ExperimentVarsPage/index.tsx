import React from "react";
import { Dispatch, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";

import { moduleNames as experimentsNames } from "../../reducers/MainReducer";
import { AppState } from "reducers/GlobalReducer";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { ExperimentVariable } from "models/Experiment";
import { getVarsById } from "modules/experimentsRepository/selectors";
import { loadExperimentVars } from "modules/experimentsRepository/actions";

interface Props extends RouteComponentProps {
  variables: ExperimentVariable[];
  loadVariables: Function;
}

interface State {}

class ExperimentVarsPage extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    const { loadVariables, match, variables } = this.props;
    !variables && loadVariables((match.params as any).experimentId);
  }

  render() {
    const { match, variables } = this.props;
    return (
      <>
        <BreadcrumbsItem
          to={`/${experimentsNames.url}/repository/detail/${
            (match.params as any).experimentId
          }/variables`}
        >
          Experiment variables
        </BreadcrumbsItem>
        <section className="section p-b-0">
          <div className="container">
            {variables &&
              variables.map((item, i) => (
                <div className="box" key={`note-${i}`}>
                  <span>
                    <strong>{item.name}</strong> ({item.code}) | {item.type}
                  </span>
                </div>
              ))}
          </div>
        </section>
      </>
    );
  }
}

const mapStateToProps = (state: AppState, ownProps) => {
  return {
    variables: getVarsById(state, ownProps.match.params.experimentId)
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadVariables: bindActionCreators(loadExperimentVars, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ExperimentVarsPage);
