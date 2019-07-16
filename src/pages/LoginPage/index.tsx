import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import LoginForm, { Values } from "./LoginForm";
import { AppState } from "../../reducers/globalReducer";
import { login } from "../../actions/userActions";
import { getUser } from "../../selectors/userSelectors";

interface Props {
  submitLogin: (payload: Values) => any;
  user: any;
  // TODO: models for entities
}

class LoginPage extends React.Component<Props> {
  componentDidMount() {}

  render() {
    const { submitLogin, user } = this.props;
    const error = user ? user.error : undefined;

    return (
      <div className={"jumbotron"}>
        <div className={"container"}>
          <div className="col-sm-8 offset-sm-2">
            <LoginForm submitLogin={submitLogin} error={error} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  user: getUser(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  submitLogin: (payload: { username: String; password: String }) =>
    dispatch<any>(login(payload.username, payload.password))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
