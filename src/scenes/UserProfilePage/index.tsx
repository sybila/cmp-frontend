import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";

import { getUser, hasPermission } from "ApplicationSelectors";
import { faUsers, faIdCard, faEdit } from "@fortawesome/free-solid-svg-icons";

import Profile from "./Profile";
import EditProfile from "./EditProfile";
import Groups from "./Groups";
import { Tabs, Tab } from "components/Tabs";
import { AppState } from "reducers/GlobalReducer";
import config from "config";

const UserProfilePage = () => {
  const params = useParams<{ subPage: string }>();
  const user = useSelector(getUser);

  const isTemporary = user.type.tier === config.permissions.UNVERIFIED;

  return (
    <div className={"profile-wrapper"}>
      <BreadcrumbsItem to="/profile">Profile</BreadcrumbsItem>
      <Tabs defaultTab={params.subPage}>
        <Tab name="" caption="Profile" icon={faIdCard}>
          <Profile user={user} isTemporary={isTemporary} />
        </Tab>
        <Tab name="groups" caption="Groups" icon={faUsers}>
          <Groups user={user} />
        </Tab>
        {!isTemporary && (
          <Tab name="edit" caption="Edit Profile" icon={faEdit}>
            <EditProfile />
          </Tab>
        )}
      </Tabs>
    </div>
  );
};

export default UserProfilePage;
