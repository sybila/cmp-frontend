import React from "react";

class Picture extends React.Component {
  render() {
    return (
      <div>
        <img
          src="//placehold.it/150"
          className="m-x-auto img-fluid img-circle"
          alt="avatar"
        />
        <h6 className="m-t-2">Upload a different photo</h6>
        <label className="custom-file">
          <input type="file" id="file" className="custom-file-input" />
          <span className="custom-file-control">Choose file</span>
        </label>
      </div>
    );
  }
}

export default Picture;
