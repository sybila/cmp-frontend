import React from "react";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { RouteComponentProps, Route, Switch, NavLink } from "react-router-dom";
import { capitalize } from "utils/helpers";

import { AppState } from "reducers/GlobalReducer";
import { loadModel } from "../../actions";
import { getModelById } from "../../selectors";
import { Model as ModelType } from "models/Model";
import { moduleNames as modelsNames } from "../../reducers/MainReducer";

import Model from "./Model";

interface Props extends RouteComponentProps {
  loadModel: typeof loadModel;
  getModelById: (id: number) => ModelType;
}

const getRoutes = (id: number) => {
  const base = `/${modelsNames.url}/model-detail/${id}`;
  return {
    model: `${base}/model`,
    components: `${base}/components`,
    reactions: `${base}/reactions`,
    parameters: `${base}/parameters`,
    simulation: `${base}/simulation`,
    analysis: `${base}/analysis`
  };
};

class ModelDetail extends React.Component<Props> {
  componentDidMount() {
    const { match, loadModel } = this.props;
    loadModel((match.params as any).modelId);
  }

  render() {
    const { match, getModelById } = this.props;

    const model = getModelById((match.params as any).modelId);
    const routes = model && getRoutes(model.id);
    return model ? (
      <div className="mdc-layout-grid__inner">
        <BreadcrumbsItem to="/models-repo/published-models">
          {model.name}
        </BreadcrumbsItem>
        <h2
          className={
            "module-heading mdc-layout-grid__cell mdc-layout-grid__cell--span-12"
          }
        >
          {model.name}
        </h2>
        <div className="nav module-nav mdc-layout-grid__cell mdc-layout-grid__cell--span-12">
          {Object.keys(routes).map((name: string) => {
            return (
              <li className="nav-item" key={`model-nav-${name}`}>
                <NavLink to={routes[name]} className="nav-link">
                  {capitalize(name)}
                </NavLink>
              </li>
            );
          })}
        </div>
        <Switch>
          <Route path={routes.components} component={Model} />
          <Route
            path={routes.model}
            render={() => <Model description={model.description} />}
          />
        </Switch>
      </div>
    ) : (
      <div></div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  getModelById: getModelById(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadModel: bindActionCreators(loadModel, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModelDetail);
