import React, { Suspense } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

const DataUsePolicy = React.lazy(() => import("./DataUsePolicy"));
const TermsAndConditions = React.lazy(() => import("./TermsAndConditions"));

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
            </Switch>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Pages;
