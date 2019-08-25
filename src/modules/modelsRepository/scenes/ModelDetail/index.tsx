import React from "react";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { RouteComponentProps } from "react-router-dom";

import { AppState } from "reducers/GlobalReducer";
import { loadModel } from "../../actions";
import { getModelById } from "../../selectors";

interface Props extends RouteComponentProps {
  loadModel: typeof loadModel;
  getModelById: (id: number) => any;
}

class ModelDetail extends React.Component<Props> {
  componentDidMount() {
    const { match, loadModel } = this.props;
    loadModel((match.params as any).modelId);
  }

  render() {
    const { match, getModelById } = this.props;

    const model = getModelById((match.params as any).modelId);
    return (
      <div>
        <BreadcrumbsItem to="/models-repo/published-models">
          Miyoshi et al. 2007
        </BreadcrumbsItem>
        <div>
          <p>{model && model.description}</p>
        </div>
      </div>
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
