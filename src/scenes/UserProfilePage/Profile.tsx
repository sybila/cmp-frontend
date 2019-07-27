import React from "react";
import { UserModel } from "../../models/User";

interface Props {
  user: UserModel;
}

class Profile extends React.Component<Props> {
  render() {
    const { user } = this.props;

    return (
      <div>
        <h2>User Profile</h2>
        <div className="row">
          <div className="col-md-6">
            <h6>Username: {user.username}</h6>
            <h6>E-mail: {user.email}</h6>
            {user.about && (
              <div className={"mt-4"}>
                <h6>About</h6>
                <p>{user.about}</p>
              </div>
            )}
          </div>
          <div className="col-md-12">
            <h4 className="m-t-2">
              <span className="fa fa-clock-o ion-clock pull-xs-right"></span>{" "}
              Recent Activity
            </h4>
            <table className="table table-hover table-striped">
              <tbody>
                <tr>
                  <td>
                    <strong>Abby</strong> joined ACME Project Team in{" "}
                    <strong>`Collaboration`</strong>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Gary</strong> deleted My Board1 in{" "}
                    <strong>`Discussions`</strong>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Kensington</strong> deleted MyBoard3 in{" "}
                    <strong>`Discussions`</strong>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>John</strong> deleted My Board1 in{" "}
                    <strong>`Discussions`</strong>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Skell</strong> deleted his post Look at Why this
                    is.. in <strong>`Discussions`</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
