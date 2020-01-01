import React from "react";
import { Dispatch, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { RouteComponentProps, Switch, Route } from "react-router";
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
  loadExperiments
} from "modules/experimentsRepository/actions";
import ExperimentPropsPage from "../ExperimentPropsPage";
import ExperimentNotesPage from "../ExperimentNotesPage";
import ExperimentVarsPage from "../ExperimentVarsPage";

interface Props extends RouteComponentProps {
  experimentsById: ByIdObject<Experiment>;
  loadExperiment: Function;
  loadExperiments: Function;
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
      experimentsById
    } = this.props;

    const experiment = experimentsById[(match.params as any).experimentId];
    if (!experiment || Object.keys(experiment).length <= 7) {
      loadExperiment((match.params as any).experimentId).catch(() => {
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
      !_.isEqual(
        (match.params as any).experimentId,
        (prevProps.match.params as any).experimentId
      )
    ) {
      this.fetchExperiment();
    }
  }

  render() {
    const { experimentsById, match } = this.props;
    const currentExperiment =
      experimentsById[(match.params as any).experimentId];

    const base = `/${experimentsNames.url}/repository/detail`;
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
        exact: true
      },
      {
        caption: "Protocol",
        to: "/protocol",
        order: 0
      },
      {
        caption: "Notes",
        to: "/notes",
        component: ExperimentNotesPage,
        order: 1
      },
      {
        caption: "Variables",
        to: "/variables",
        component: ExperimentVarsPage,
        order: 2
      },
      {
        caption: "Values",
        to: "/values",
        order: 3
      },
      {
        caption: "View char",
        to: "/char",
        order: 4
      }
    ];

    return currentExperiment ? (
      <>
        <BreadcrumbsItem to={`/${experimentsNames.url}/repository/detail`}>
          {currentExperiment.name}
        </BreadcrumbsItem>
        <section className="section p-b-0">
          <div className="container">
            <h2 className="title is-2">{currentExperiment.name}</h2>
            <PageMenuPanel items={routes} basePath={routeLinkBase} />
          </div>
        </section>
        <Switch>
          {_.sortBy(routes, [route => route.order]).map((route, i) => (
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
  experimentsById: getExperimentsObject(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadExperiment: bindActionCreators(loadExperiment, dispatch),
  loadExperiments: bindActionCreators(loadExperiments, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailPage);
