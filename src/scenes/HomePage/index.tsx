import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import ModelsList from "../../modules/modelsRepository/components/ModelsList";
import { AppState } from "../../reducers/globalReducer";

interface Props {}

class LoginPage extends React.Component<Props> {
  componentDidMount() {}

  render() {
    return (
      <React.Fragment>
        <div className={"landing-hero"}>
          <h1>Lorem ipsum dolor sit</h1>
          <p className={"lead"}>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Praesent
            id justo in neque elementum ultrices. Fusce dui leo, imperdiet in,
            aliquam sit amet, feugiat eu, orci. Quis autem vel eum iure
            reprehenderit qui in ea voluptate velit esse quam nihil molestiae
            consequatur.
          </p>
          <a className={"btn btn-primary btn-lg"} href="#" role="button">
            Learn more
          </a>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: AppState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
