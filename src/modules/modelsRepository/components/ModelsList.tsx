import React from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";

import { loadModels } from "../actions";

interface Props {
  loadModels: Function;
}

class ModelsList extends React.Component<Props> {
  componentDidMount() {
    this.props.loadModels();
  }

  render() {
    return <div></div>;
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadModels: bindActionCreators(loadModels, dispatch)
});

export default connect(
  null,
  mapDispatchToProps
)(ModelsList);
