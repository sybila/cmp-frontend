import React from "react";
import { connect } from "react-redux";
import { getUser } from "../selectors/userSelectors";
import { AppState } from "../reducers/globalReducer";

class PrivateComponent extends React.Component<any> {
  render() {
    const { children, user } = this.props;
    return <React.Fragment>{user && children}</React.Fragment>;
  }
}

const mapStateToProps = (state: AppState) => ({
  user: getUser(state)
});

export default connect(mapStateToProps)(PrivateComponent);
