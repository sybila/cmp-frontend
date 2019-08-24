import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { AppState } from "reducers/GlobalReducer";

interface Props {}

// TODO: Dashboard
class LoginPage extends React.Component<Props> {
  componentDidMount() {}

  render() {
    return <React.Fragment></React.Fragment>;
  }
}

const mapStateToProps = (state: AppState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
