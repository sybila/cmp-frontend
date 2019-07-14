import React from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";

import LoginForm from "./LoginForm";
import { AppState } from "../../reducers/globalReducer";
import { authentication } from "../../actions";

interface Props {
  login: Function;
}

class LoginPage extends React.Component<Props> {
  componentDidMount() {
    this.props.login();
  }

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

const mapDispatchToProps = (dispatch: Dispatch) => ({
  login: bindActionCreators(authentication, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
