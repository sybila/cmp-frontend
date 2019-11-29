import React from "react";
import { Router, Route, NavLink, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import { BreadcrumbsProvider, Breadcrumbs } from "react-breadcrumbs-dynamic";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { Section, Container, Columns } from "react-bulma-components";

import 'react-bulma-components/dist/react-bulma-components.min.css';
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
import { intercept } from "utils/inlineInterceptor";
import { login } from "ApplicationActions";

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

        <Columns gapless breakpoint="mobile">
          <Columns.Column narrow>
            <PrivateComponent>
              <Toolbar />
            </PrivateComponent>
          </Columns.Column>
          <Columns.Column className="content-column">
              <TopMenu />
              <div className="content">
                <Section>
                  <Container>
                    <Breadcrumbs separator={<b> / </b>} item={NavLink} />
                  </Container>
                </Section>
                {this.props.children}
              </div>
          </Columns.Column>
        </Columns>
      </div>
    );
  }
}

/**
 * Intecrepts Access token a logs in user if the token is valid
 */
const InterceptLogin = intercept((state, dispatch) => {
  // TEMP: User stays logged in (dev purposes)
  return dispatch<any>(login("admin", "test"));

  /* if (getUser(state)) {
    // Do something if user exists
    return true;
  }

  const token = localStorage.getItem("user");
  if (token) {
    return dispatch<any>(tokenLogin(token))
      .then(() => {
        // TODO: Optional redirect to previous location
        return true;
      })
      .catch(() => {
        return () => history.push("/login");
      });
  }

  return false;*/
});

export const history = createBrowserHistory();

// Library to reference icons
library.add(fas);

class Application extends React.Component<any> {
  render() {
    return (
      <React.Fragment>
        {/* Interceptors */}
        <InterceptLogin />

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
                <MasterPage>
                  <Switch>
                    <Route exact path={`${url}`} component={HomePage} />
                    <Route path={`${url}login`} component={LoginPage} />
                    <Route
                      path={`${url + modelsNames.url}`}
                      component={ModelsModule}
                    />
                    <Route 
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
              )}
            />
          </Router>
        </BreadcrumbsProvider>
      </React.Fragment>
    );
  }
}

export default Application;
