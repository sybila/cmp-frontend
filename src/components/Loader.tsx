import React from "react";
import { connect } from "react-redux";

import { AppState } from "reducers/GlobalReducer";

interface Props {
  showLoader: number;
}

class Loader extends React.PureComponent<Props> {
  render() {
    const { showLoader } = this.props;
    return (
      <React.Fragment>
        {showLoader ? (
          <div className="overlay">
            <div className="spinner"></div>
          </div>
        ) : (
          undefined
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  showLoader: state.loader.show
});

export default connect(mapStateToProps)(Loader);
