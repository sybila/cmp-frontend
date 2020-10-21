import { UserModel } from "models/User";
import React from "react";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";

interface Props {
  user: UserModel;
}

const Groups = (props: Props) => {
  const { user } = props;

  return (
    <div>
      <BreadcrumbsItem to="/profile/groups">Groups</BreadcrumbsItem>
      <h2>Groups</h2>
      {user.groups.map((group) => {
        return (
          <div className="box">
            <article className="media">
              <div className="media-content">
                <p>
                  <strong>{group.name}</strong>
                </p>
              </div>
            </article>
          </div>
        );
      })}
    </div>
  );
};

export default Groups;
