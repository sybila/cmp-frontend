import React, { Suspense } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import NotFoundPage from "scenes/NotFoundPage";

const DataUsePolicy = React.lazy(() => import("./DataUsePolicy"));
const TermsAndConditions = React.lazy(() => import("./TermsAndConditions"));
const AboutUs = React.lazy(() => import("./AboutUs"));

const Pages = () => {
  const match = useRouteMatch();

  return (
    <div className="section">
      <div className="container">
        <div className="box pages">
          <Suspense fallback={<div>Loading</div>}>
            <Switch>
              <Route
                path={`${match.url}/data-use-policy`}
                component={DataUsePolicy}
              />
              <Route
                path={`${match.url}/terms-and-conditions`}
                component={TermsAndConditions}
              />
              <Route path={`${match.url}/about-us`} component={AboutUs} />
              <Route component={NotFoundPage} />
            </Switch>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Pages;
