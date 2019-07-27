import React from "react";
import { connect } from "react-redux";

import { AppState } from "../../reducers/globalReducer";
import { getUser } from "../../selectors/userSelectors";
import { UserModel } from "../../models/User";

import ProfileNav from "./ProfileNav";
import Profile from "./Profile";
import EditProfile from "./EditProfile";
import Groups from "./Groups";
import Picture from "./Picture";

interface Props {
  match: any;
  user: UserModel;
}

class UserProfilePage extends React.Component<Props> {
  render() {
    const { match, user } = this.props;

    const page = (() => {
      switch (match.params.subPage) {
        case "edit":
          return <EditProfile />;
        case "groups":
          return <Groups />;
        default:
          return <Profile user={user} />;
      }
    })();

    return (
      <div className={"profile-wrapper"}>
        <div className="row m-y-2">
          <div className="col-lg-3 text-xs-center">
            <Picture />
          </div>
          <div className="col-lg-9">
            <ProfileNav />
            <div className="tab-content profile-section">{page}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  user: getUser(state)
});

export default connect(mapStateToProps)(UserProfilePage);
