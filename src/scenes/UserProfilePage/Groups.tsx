import React from "react";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";

class Groups extends React.Component {
  render() {
    return (
      <div>
        <BreadcrumbsItem to="/profile/groups">Groups</BreadcrumbsItem>
        <h2>Groups</h2>
      </div>
    );
  }
}

export default Groups;
