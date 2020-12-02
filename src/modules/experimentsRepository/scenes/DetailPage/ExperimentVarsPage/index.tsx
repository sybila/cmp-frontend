import React from "react";
import { Dispatch, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { RouteComponentProps, Route, Switch } from "react-router";

import { moduleNames as experimentsNames } from "../../../reducers/MainReducer";
import { AppState } from "reducers/GlobalReducer";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { ExperimentVariable } from "models/Experiment";
import { getVarsById } from "modules/experimentsRepository/selectors";
import { loadExperimentVars } from "modules/experimentsRepository/actions";
import Pager from "components/Pager";
import { history } from "Application";
import { Link } from "react-router-dom";
import VarDataPage from "./VarDataPage";
import { ExperimentComponentProps } from "../..";

interface Props extends ExperimentComponentProps {
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
    !variables && loadVariables(match.params.experimentId);
  }

  render() {
    const { match, variables } = this.props;

    const variablesRender = (
      <section className="section p-b-0">
        <div className="container">
          <Pager countOnPage={5}>
            {variables &&
              variables.map((item, i) => (
                <div className="box variable-item" key={`note-${i}`}>
                  <strong className="m-r-5">{item.name}</strong>
                  <span className="m-r-5">({item.code})</span>
                  <span>| {item.type}</span>
                  <Link
                    className="button is-primary"
                    to={`/${experimentsNames.url}/detail/${match.params.experimentId}/variables/${item.id}/data`}
                  >
                    View data
                  </Link>
                </div>
              ))}
          </Pager>
        </div>
      </section>
    );

    return (
      <>
        <BreadcrumbsItem
          to={`/${experimentsNames.url}/detail/${match.params.experimentId}/variables`}
        >
          Variables
        </BreadcrumbsItem>
        <Switch>
          <Route
            path={`/${experimentsNames.url}/detail/:experimentId/variables/:variableId/data`}
            component={VarDataPage}
          />

          <Route render={() => variablesRender} />
        </Switch>
      </>
    );
  }
}

const mapStateToProps = (state: AppState, ownProps) => {
  return {
    variables: getVarsById(state, ownProps.match.params.experimentId),
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadVariables: bindActionCreators(loadExperimentVars, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExperimentVarsPage);
