import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { AppState } from "../../reducers/globalReducer";

interface Props {}

class LoginPage extends React.Component<Props> {
  componentDidMount() {}

  render() {
    return (
      <div className={"jumbotron"}>
        <h1 className={"display-4"}>Hello, world!</h1>
        <p className={"lead"}>
          This is a simple hero unit, a simple jumbotron-style component for
          calling extra attention to featured content or information.
        </p>
        <hr className={"my-4"} />
        <p>
          It uses utility classes for typography and spacing to space content
          out within the larger container.
        </p>
        <a className={"btn btn-primary btn-lg"} href="#" role="button">
          Learn more
        </a>
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
