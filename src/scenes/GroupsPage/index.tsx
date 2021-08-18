import React from "react";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { Box, Heading } from "rebass/styled-components";

const GroupsPage = () => {
  return (
    <section className="section p-b-0">
      <div className="container">
        <BreadcrumbsItem to="/groups">Groups</BreadcrumbsItem>
        <Heading fontSize={2} fontWeight="bold">
          Groups
        </Heading>
      </div>
    </section>
  );
};

export default GroupsPage;
