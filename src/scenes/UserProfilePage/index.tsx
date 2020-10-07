import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";

import { getUser } from "ApplicationSelectors";
import { faUsers, faIdCard, faEdit } from "@fortawesome/free-solid-svg-icons";

import Profile from "./Profile";
import EditProfile from "./EditProfile";
import Groups from "./Groups";
import { Tabs, Tab } from "components/Tabs";

const UserProfilePage = () => {
  const params = useParams<{ subPage: string }>();
  const user = useSelector(getUser);

  return (
    <div className={"profile-wrapper"}>
      <BreadcrumbsItem to="/profile">Profile</BreadcrumbsItem>
      <Tabs defaultTab={params.subPage}>
        <Tab name="" caption="Profile" icon={faIdCard}>
          <Profile user={user} />
        </Tab>
        <Tab name="groups" caption="Groups" icon={faUsers}>
          <Groups />
        </Tab>
        <Tab name="edit" caption="Edit Profile" icon={faEdit}>
          <EditProfile />
        </Tab>
      </Tabs>
    </div>
  );
};

export default UserProfilePage;
