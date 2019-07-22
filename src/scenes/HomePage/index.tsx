import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Link } from "react-router-dom";

import { AppState } from "../../reducers/globalReducer";

interface Props {}

class LoginPage extends React.Component<Props> {
  componentDidMount() {}

  render() {
    return (
      <div className={"jumbotron"}>
        <div className={"container"}>
          <Link to="/login">Logout</Link>
          <div className="col-sm-8 offset-sm-2">
            <h1>Home page</h1>
          </div>
        </div>
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
