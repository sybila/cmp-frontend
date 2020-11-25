import React from "react";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { RouteComponentProps, Route, Switch, Link } from "react-router-dom";
import PageMenuPanel from "components/PageMenuPanel";

import { AppState } from "reducers/GlobalReducer";
import { loadModel } from "../../actions";
import { getModelById } from "../../selectors";
import { Model as ModelType } from "models/Model";
import { moduleNames as modelsNames } from "../../reducers/MainReducer";
import Model from "./Model";

import { hasPermission } from "ApplicationSelectors";
import Config from "config";
import { sortBy } from "lodash";

interface Props extends RouteComponentProps {
  loadModel: typeof loadModel;
  getModelById: (id: number) => ModelType;
  hasPermission: (permissionLevel: number) => boolean;
}

const routes = [
  {
    caption: "Model",
    to: "",
    component: Model,
    order: 5,
    exact: true,
  },
  {
    caption: "Components",
    to: "/components",
    order: 5,
    exact: true,
  },
  {
    caption: "Reactions",
    to: "/reactions",
    order: 5,
    exact: true,
  },
  {
    caption: "Parameters",
    to: "/parameters",
    order: 5,
    exact: true,
  },
  {
    caption: "Simulation",
    to: "/simulation",
    order: 5,
    exact: true,
  },
  {
    caption: "Analysis",
    to: "/analysis",
    order: 5,
    exact: true,
  },
];

const base = `/${modelsNames.url}/model-detail`;

class ModelDetail extends React.Component<Props> {
  componentDidMount() {
    const { match } = this.props;
    this.props.loadModel((match.params as any).modelId);
  }

  render() {
    const { match } = this.props;

    const model = this.props.getModelById((match.params as any).modelId);

    const routeLinkBase = `${base}${model ? `/${model.id}` : ""}`;
    const routeBase = `${base}/:modelId`;
    return model ? (
      <>
        <BreadcrumbsItem to={`${base}/${model.id}`}>
          {model.name}
        </BreadcrumbsItem>

        <section className="section p-b-0">
          <div className="container is-clearfix">
            <h2 className="title is-2 is-pulled-left">{model.name}</h2>
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
          {sortBy(routes, [(route) => route.order]).map((route, i) => (
            <Route
              path={`${routeBase}${route.to}`}
              component={route.component}
              key={`model-detail-${i}`}
            />
          ))}
        </Switch>
      </>
    ) : (
      <section className="section p-b-0">
        <div className="container">
          <div className="box ">
            <h4 className="title is-4 m-b-10">Error</h4>
            <div className="notification is-danger is-light">
              <strong>Error: </strong>selected model was not found.
            </div>
            <Link to="/models">Return to repository</Link>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  getModelById: getModelById(state),
  hasPermission: (permissionLevel: number) =>
    hasPermission(state, permissionLevel),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadModel: bindActionCreators(loadModel, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModelDetail);
