import React from "react";

import ProfileNav from "./ProfileNav";
import Profile from "./Profile";
import EditProfile from "./EditProfile";
import Picture from "./Picture";

interface Props {
  match: any;
}

class UserProfilePage extends React.Component<Props> {
  render() {
    const { match } = this.props;

    const page = (() => {
      switch (match.params.subPage) {
        case "edit":
          return <EditProfile />;
        default:
          return <Profile />;
      }
    })();

    return (
      <div className="container">
        <div className="row m-y-2">
          <div className="col-lg-3 pull-lg-8 text-xs-center">
            <Picture />
          </div>
          <div className="col-lg-9 push-lg-4">
            <ProfileNav />
            <div className="tab-content p-b-3">{page}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserProfilePage;
