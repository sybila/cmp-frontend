import React from "react";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";

class MainPage extends React.Component {
  render() {
    return (
      <div>
        <BreadcrumbsItem to="/models-repo">Models Repository</BreadcrumbsItem>
      </div>
    );
  }
}

export default MainPage;
