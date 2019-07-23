import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Link } from "react-router-dom";

import { AppState } from "../../reducers/globalReducer";

interface Props {}

class NotFoundPage extends React.Component<Props> {
  componentDidMount() {}

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-md-12 text-center">
            <span className="display-1 d-block">404</span>
            <div className="mb-4 lead">
              The page you are looking for was not found.
            </div>
            <Link to={"/"} className="btn btn-link">
              Back to Home
            </Link>
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
)(NotFoundPage);
