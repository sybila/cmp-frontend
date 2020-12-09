import React from "react";
import { Router, Route, NavLink, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import { BreadcrumbsProvider, Breadcrumbs } from "react-breadcrumbs-dynamic";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { isEqual } from "lodash";

import "./styles/main.scss";

import LoginPage from "scenes/LoginPage/";
import RegistrationPage from "scenes/RegistrationPage";
import HomePage from "scenes/HomePage/";
import NotFoundPage from "scenes/NotFoundPage/";
import UserProfilePage from "scenes/UserProfilePage";
import Pages from "scenes/Pages";

import ModelsModule from "modules/modelsRepository/scenes/";
import { moduleNames as modelsNames } from "modules/modelsRepository/reducers/MainReducer";

import ExperimentsModule from "modules/experimentsRepository/scenes/";
import { moduleNames as experimentsNames } from "modules/experimentsRepository/reducers/MainReducer";

import BioQuantitiesModule from "modules/bioQuantities/routes";
import { moduleNames as bioQuantitiesNames } from "modules/bioQuantities/reducers/MainReducer";

import Loader from "./components/Loader";
import PrivateRoute from "./components/PrivateRoute";
import PrivateComponent from "./components/PrivateComponent";
import Portal from "./components/Portal";
import NotificationsProvider from "./modules/administration/components/NotificationsProvider";
import Toolbar from "modules/administration/components/Toolbar";
import Inbox from "./modules//administration/components/Inbox";

import TopMenu from "./components/TopMenu";
import EmailConfirm from "scenes/EmailConfirm";
import { useTokenLogin } from "hooks/useTokenLogin";
import { useSelector } from "react-redux";
import { getUser } from "ApplicationSelectors";
import GlobalNotice from "components/GlobalNotice";
import PasswordRenewal from "scenes/PasswordRenewal";
import RenewalPage from "scenes/PasswordRenewal/RenewalPage";

/**
 * Master Page
 *
 * Application layout/logic component. Pages that
 * doesn't inherit layout should be defined by
 * themselves.
 */

const MasterPage = (props: any) => {
  const user = useSelector(getUser, isEqual);

  return (
    <div className={`theme-default app-wrapper logged-in`}>
      <PrivateComponent>
        <Inbox />
      </PrivateComponent>
      <Portal>
        <Toolbar />
      </Portal>

      <div className="columns is-mobile is-gapless">
        <div className="column content-column">
          <div className="top-menu-container">
            <TopMenu />
          </div>

          <GlobalNotice />
          <div className="content">
            <section className="section bc-section p-b-0">
              <div className="container">
                <Breadcrumbs separator={<b> / </b>} item={NavLink} />
              </div>
            </section>
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
};

export const history = createBrowserHistory();

// Library to reference icons
library.add(fas);

const Application = () => {
  useTokenLogin("/");

  return (
    <React.Fragment>
      {/* Portal block, for components with absolute positioning */}
      <Portal>
        <PrivateComponent>
          <NotificationsProvider />
        </PrivateComponent>
        <Loader />
      </Portal>

      {/* Application routing (with root master page defining basic layout)*/}
      <BreadcrumbsProvider>
        <Router history={history}>
          {/* Portal block for components which need access to Router */}

          <Route
            path="/"
            render={({ match: { url } }) => (
              <Switch>
                <MasterPage>
                  <Switch>
                    <Route exact path={`${url}`} component={HomePage} />
                    <Route exact path={`${url}login`} component={LoginPage} />
                    <Route
                      exact
                      path={`${url}email-confirm/:email/:id`}
                      component={EmailConfirm}
                    />
                    <Route
                      exact
                      path={`${url}password-renewal`}
                      component={PasswordRenewal}
                    />
                    <Route
                      exact
                      path={`${url}email-confirm/:email/pswRenew/:hash`}
                      component={RenewalPage}
                    />
                    <Route
                      exact
                      path={`${url}register`}
                      component={RegistrationPage}
                    />
                    <Route path={`${url}page`} component={Pages} />

                    <Route
                      path={`${url + modelsNames.url}`}
                      component={ModelsModule}
                    />
                    <Route
                      path={`${url + experimentsNames.url}`}
                      component={ExperimentsModule}
                    />

                    <Route
                      path={`${url + bioQuantitiesNames.url}`}
                      component={BioQuantitiesModule}
                    />

                    <PrivateRoute
                      path={`${url}profile/:subPage?`}
                      component={UserProfilePage}
                    />
                    <Route component={NotFoundPage} />
                  </Switch>
                </MasterPage>
              </Switch>
            )}
          />
        </Router>
      </BreadcrumbsProvider>
    </React.Fragment>
  );
};

export default Application;
