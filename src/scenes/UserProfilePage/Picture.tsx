import React from "react";
import profilePlaceholder from "../../assets/profile-placeholder.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

class Picture extends React.Component {
  render() {
    return (
      <div>
        <img
          src={profilePlaceholder}
          className="m-x-auto img-fluid rounded-circle"
          alt="avatar"
        />
        <label
          htmlFor="fileUpload"
          className="file-upload btn btn-success btn-block rounded-pill shadow mt-4"
        >
          <FontAwesomeIcon icon={faUpload} className={"mr-2"} />
          Upload a different photo
          <input id="fileUpload" type="file" />
        </label>
      </div>
    );
  }
}

export default Picture;
