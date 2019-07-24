import React from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";

import { AppState } from "../../reducers/globalReducer";
import UserUtils from "./UserUtils";
import { getUser } from "../../selectors/userSelectors";
import { UserModel } from "../../models/User";

interface Props {
  user: UserModel;
}

class TopMenu extends React.Component<Props> {
  render() {
    const { user } = this.props;
    return (
      <header className={"top-menu"}>
        <UserUtils user={user} />
      </header>
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
)(TopMenu);
