import React from "react";
import { connect, useSelector } from "react-redux";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";

import { AppState } from "reducers/GlobalReducer";
import { getUser } from "ApplicationSelectors";
import { UserModel } from "../../models/User";

import ProfileNav from "./ProfileNav";
import Profile from "./Profile";
import EditProfile from "./EditProfile";
import Groups from "./Groups";
import Picture from "./Picture";

import { Tabs, Tab } from "components/Tabs";
import { useParams } from "react-router-dom";

const UserProfilePage = () => {
  const params = useParams<{ subPage: string }>();
  const user = useSelector(getUser);

  return (
    <div className={"profile-wrapper"}>
      <BreadcrumbsItem to="/profile">Profile</BreadcrumbsItem>
      <Tabs defaultTab={params.subPage}>
        <Tab name="" caption="Profile">
          <Profile user={user} />
        </Tab>
        <Tab name="edit" caption="Edit Profile">
          <EditProfile />
        </Tab>
        <Tab name="groups" caption="Groups">
          <Groups />
        </Tab>
      </Tabs>
    </div>
  );
};

export default UserProfilePage;
