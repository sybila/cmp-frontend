import React from "react";
import { Router, Route, NavLink, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import { BreadcrumbsProvider, Breadcrumbs } from "react-breadcrumbs-dynamic";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

import "./styles/main.scss";

import LoginPage from "scenes/LoginPage/";
import HomePage from "./scenes/HomePage/";
import NotFoundPage from "./scenes/NotFoundPage/";
import UserProfilePage from "./scenes/UserProfilePage";

import ModelsModule from "./modules/modelsRepository/scenes/";
import { moduleNames as modelsNames } from "./modules/modelsRepository/reducers/MainReducer";

import ExperimentsModule from "./modules/experimentsRepository/scenes/";
import { moduleNames as experimentsNames } from "./modules/experimentsRepository/reducers/MainReducer";

import Loader from "./components/Loader";
import PrivateRoute from "./components/PrivateRoute";
import PrivateComponent from "./components/PrivateComponent";
import Portal from "./components/Portal";
import NotificationsProvider from "./modules/administration/components/NotificationsProvider";
import Toolbar from "modules/administration/components/Toolbar";
import Inbox from "./modules//administration/components/Inbox";

import TopMenu from "./components/TopMenu";

/**
 * Master Page
 *
 * Application layout/logic component. Pages that
 * doesn't inherit layout should be defined by
 * themselves.
 */

class MasterPage extends React.Component {
  render() {
    return (
      <div className="theme-default app-wrapper">
        <PrivateComponent>
          <Inbox />
        </PrivateComponent>
        <Portal>
          <PrivateComponent>
            <Toolbar />
          </PrivateComponent>
        </Portal>

        <div className="columns is-mobile is-gapless">
          <div className="column content-column">
            <div className="top-menu-container">
              <TopMenu />
            </div>
            <div className="content">
              <section className="section bc-section p-b-0">
                <div className="container">
                  <Breadcrumbs separator={<b> / </b>} item={NavLink} />
                </div>
              </section>
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export const history = createBrowserHistory();

// Library to reference icons
library.add(fas);

const Application = () => {
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
                <Route exact path={`${url}login`} component={LoginPage} />{" "}
                {/* TEMP: remove this when done */}
                <MasterPage>
                  <Switch>
                    <PrivateRoute exact path={`${url}`} component={HomePage} />
                    <PrivateRoute
                      path={`${url + modelsNames.url}`}
                      component={ModelsModule}
                    />
                    <PrivateRoute
                      path={`${url + experimentsNames.url}`}
                      component={ExperimentsModule}
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
