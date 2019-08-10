import React from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";

import { loadModels } from "../actions";
import { getAllModels } from "../selectors";
import { Model } from "../models/Model";
import { AppState } from "../../../reducers/globalReducer";

interface Props {
  loadModels: Function;
  models: Model[];
}

class ModelsList extends React.Component<Props> {
  componentDidMount() {
    this.props.loadModels();
  }

  render() {
    const { models } = this.props;
    return (
      <div>
        {models.map(model => (
          <h4>{model.name}</h4>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  models: getAllModels(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadModels: bindActionCreators(loadModels, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModelsList);
