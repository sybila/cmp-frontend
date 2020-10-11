import React from "react";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { Form, Field } from "react-final-form";

class EditProfile extends React.Component {
  render() {
    return (
      <div>
        <BreadcrumbsItem to="/profile/edit">Edit</BreadcrumbsItem>
        <h2>Edit Profile</h2>
      </div>
    );
  }
}

export default EditProfile;
