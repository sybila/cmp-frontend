import React from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";

import LoginForm, { Values } from "./LoginForm";
import { AppState } from "reducers/GlobalReducer";
import { login, logout, tokenLogin } from "ApplicationActions";
import { getAuthError, getUser } from "ApplicationSelectors";
import { history } from "../../Application";
import { userCookies } from "services/cookies";
import { UserModel } from "models/User";

interface Props {
  submitLogin: (payload: Values) => any;
  logout: () => void;
  user: UserModel;
  error: string;
  location?: any;
  attemptLoginWithToken: typeof tokenLogin;
  // TODO: Models for entities
}

class LoginPage extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.handleSubmitLogin = this.handleSubmitLogin.bind(this);
  }

  async componentDidMount() {
    const token = userCookies.getAuthToken();

    if (token) {
      if (!this.props.user) {
        const { location, attemptLoginWithToken } = this.props;
        const from = location.state ? location.state.from.pathname : "/";
        try {
          await attemptLoginWithToken(token);
          history.push(from);
        } catch (e) {
          console.error(e);
        }
      } else {
        this.props.logout();
      }
    }
  }

  handleSubmitLogin(payload: { username: string; password: string }) {
    const { location, submitLogin } = this.props;
    const from =
      location.state && location.state.from
        ? location.state.from.pathname
        : "/";
    submitLogin(payload).then(() => history.push(from));
  }

  render() {
    const { error } = this.props;

    return (
      <div className="login-form section">
        <div className="container">
          <div className="columns">
            <div className="column is-half is-offset-one-quarter">
              <div className={"box"}>
                <LoginForm submitLogin={this.handleSubmitLogin} error={error} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  user: getUser(state),
  error: getAuthError(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  submitLogin: (payload: { username: string; password: string }) =>
    dispatch<any>(login(payload.username, payload.password)),
  attemptLoginWithToken: bindActionCreators(tokenLogin, dispatch),
  logout: bindActionCreators(logout, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
