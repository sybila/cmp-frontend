import React from "react";

class Profile extends React.Component {
  render() {
    return (
      <div>
        <h4 className="m-y-2">User Profile</h4>
        <div className="row">
          <div className="col-md-6">
            <h6>About</h6>
            <p>Web Designer, UI/UX Engineer</p>
            <h6>Hobbies</h6>
            <p>Indie music, skiing and hiking. I love the great outdoors.</p>
          </div>
          <div className="col-md-6">
            <h6>Recent Tags</h6>
            <a href="" className="tag tag-default tag-pill">
              html5
            </a>
            <a href="" className="tag tag-default tag-pill">
              react
            </a>
            <a href="" className="tag tag-default tag-pill">
              codeply
            </a>
            <a href="" className="tag tag-default tag-pill">
              angularjs
            </a>
            <a href="" className="tag tag-default tag-pill">
              css3
            </a>
            <a href="" className="tag tag-default tag-pill">
              jquery
            </a>
            <a href="" className="tag tag-default tag-pill">
              bootstrap
            </a>
            <a href="" className="tag tag-default tag-pill">
              responsive-design
            </a>
            <hr />
            <span className="tag tag-primary">
              <i className="fa fa-user"></i> 900 Followers
            </span>
            <span className="tag tag-success">
              <i className="fa fa-cog"></i> 43 Forks
            </span>
            <span className="tag tag-danger">
              <i className="fa fa-eye"></i> 245 Views
            </span>
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
