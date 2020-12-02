import React from "react";
import { Dispatch, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Switch, Route } from "react-router";
import _ from "lodash";

import { moduleNames as experimentsNames } from "../../reducers/MainReducer";
import PageMenuPanel from "components/PageMenuPanel";
import { AppState } from "reducers/GlobalReducer";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { getExperimentsObject } from "modules/experimentsRepository/selectors";
import { ByIdObject } from "models/GenericTypes";
import { Experiment } from "models/Experiment";
import {
  loadExperiment,
  loadExperiments,
} from "modules/experimentsRepository/actions";
import ExperimentPropsPage from "./ExperimentPropsPage";
import ExperimentNotesPage from "./ExperimentNotesPage";
import ExperimentVarsPage from "./ExperimentVarsPage";
import { ExperimentComponentProps } from "..";
import ExperimentValuesPage from "./ExperimentValuesPage";
import ExperimentProtocolPage from "./ExperimentProtocolPage";
import ExperimentChartPage from "./ExperimentChartPage";
import { hasPermission } from "ApplicationSelectors";
import Config from "config";

interface Props extends ExperimentComponentProps {
  experimentsById: ByIdObject<Experiment>;
  loadExperiment: Function;
  loadExperiments: Function;
  hasPermission: (permissionLevel: number) => boolean;
}

interface State {}

class DetailPage extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);

    this.state = {};
  }

  fetchExperiment() {
    const {
      match,
      loadExperiment,
      loadExperiments,
      experimentsById,
    } = this.props;

    const experiment = experimentsById[match.params.experimentId];
    if (!experiment || Object.keys(experiment).length <= 7) {
      loadExperiment(match.params.experimentId).catch(() => {
        loadExperiments();
      });
    }
  }

  componentDidMount() {
    this.fetchExperiment();
  }

  componentDidUpdate(prevProps) {
    const { match } = this.props;
    if (
      !_.isEqual(match.params.experimentId, prevProps.match.params.experimentId)
    ) {
      this.fetchExperiment();
    }
  }

  render() {
    const { experimentsById, match } = this.props;
    const currentExperiment = experimentsById[match.params.experimentId];

    const base = `/${experimentsNames.url}/detail`;
    const routeLinkBase = `${base}${
      currentExperiment ? `/${currentExperiment.id}` : ""
    }`;
    const routeBase = `${base}/:experimentId`;
    const routes = [
      {
        caption: "Experiment",
        to: "",
        component: ExperimentPropsPage,
        order: 5,
        exact: true,
      },
      {
        caption: "Protocol",
        to: "/protocol",
        component: ExperimentProtocolPage,
        order: 0,
      },
      {
        caption: "Notes",
        to: "/notes",
        component: ExperimentNotesPage,
        order: 1,
      },
      {
        caption: "Variables",
        to: "/variables",
        component: ExperimentVarsPage,
        order: 2,
      },
      {
        caption: "Values",
        to: "/values",
        component: ExperimentValuesPage,
        order: 3,
      },
      {
        caption: "View chart",
        to: "/chart",
        component: ExperimentChartPage,
        order: 4,
      },
    ];

    return currentExperiment ? (
      <>
        <BreadcrumbsItem to={`/${experimentsNames.url}/detail`}>
          {currentExperiment.name}
        </BreadcrumbsItem>
        <section className="section p-b-0">
          <div className="container is-clearfix">
            <h2 className="title is-2 is-pulled-left">
              {currentExperiment.name}
            </h2>
            {this.props.hasPermission(Config.permissions.POWERUSER) && (
              <button className="button is-rounded is-pulled-right">
                Edit experiment
              </button>
            )}
          </div>
          <div className="container">
            <PageMenuPanel items={routes} basePath={routeLinkBase} />
          </div>
        </section>
        <Switch>
          {_.sortBy(routes, [(route) => route.order]).map((route, i) => (
            <Route
              path={`${routeBase}${route.to}`}
              component={route.component}
              key={`experiment-detail-${i}`}
            />
          ))}
        </Switch>
      </>
    ) : (
      <></>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  experimentsById: getExperimentsObject(state),
  hasPermission: (permissionLevel: number) =>
    hasPermission(state, permissionLevel),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadExperiment: bindActionCreators(loadExperiment, dispatch),
  loadExperiments: bindActionCreators(loadExperiments, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailPage);
