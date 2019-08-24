import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { UserModel } from "models/User";
import { getUser } from "ApplicationSelectors";
import { AppState } from "reducers/GlobalReducer";
import Dashboard from "modules/administration/scenes/Dashboard";

interface Props {
  user: UserModel;
}

class LoginPage extends React.Component<Props> {
  componentDidMount() {}

  render() {
    return !this.props.user ? (
      <div className={"landing-hero"}>
        <h1>Lorem ipsum dolor sit</h1>
        <p className={"lead"}>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Praesent id
          justo in neque elementum ultrices. Fusce dui leo, imperdiet in,
          aliquam sit amet, feugiat eu, orci. Quis autem vel eum iure
          reprehenderit qui in ea voluptate velit esse quam nihil molestiae
          consequatur.
        </p>
        <a className={"btn btn-primary btn-lg"} href="#" role="button">
          Learn more
        </a>
      </div>
    ) : (
      <Dashboard />
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  user: getUser(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
