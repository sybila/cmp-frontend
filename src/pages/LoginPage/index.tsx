import React from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";

import LoginForm from "./LoginForm";
import { AppState } from "../../reducers/globalReducer";

interface Props {
  login: Function;
}

class LoginPage extends React.Component<Props> {
  componentDidMount() {}

  render() {
    return (
      <div>
        <h3>Login page</h3>
        <LoginForm />
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
