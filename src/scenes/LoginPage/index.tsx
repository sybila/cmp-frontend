import React from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";

import LoginForm, { Values } from "./LoginForm";
import { AppState } from "../../reducers/globalReducer";
import { login, logout } from "../../actions/userActions";
import { getUser, getError } from "../../selectors/userSelectors";
import { history } from "../../Application";

interface Props {
  submitLogin: (payload: Values) => any;
  logout: () => void;
  user: any;
  error: string;
  location?: any;
  // TODO: Models for entities
}

class LoginPage extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.props.logout();

    this.handleSubmitLogin = this.handleSubmitLogin.bind(this);
  }

  componentDidMount() {}

  handleSubmitLogin(payload: { username: string; password: string }) {
    const { location, submitLogin } = this.props;
    const from = location.state ? location.state.from.pathname : "/";
    submitLogin(payload).then(() => history.push(from));
  }

  render() {
    const { error } = this.props;

    return (
      <div className={"jumbotron"}>
        <div className={"container"}>
          <div className="col-sm-8 offset-sm-2">
            <LoginForm submitLogin={this.handleSubmitLogin} error={error} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  user: getUser(state),
  error: getError(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  submitLogin: (payload: { username: string; password: string }) =>
    dispatch<any>(login(payload.username, payload.password)),
  logout: bindActionCreators(logout, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
