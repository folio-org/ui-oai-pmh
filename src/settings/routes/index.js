import React from 'react';
import {
  withRouter,
  Route,
  Switch,
} from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';

import {
  SetsCreateRoute,
  SetsListRoute,
  SetsEditRoute,
  SetsViewRoute,
} from './sets';

const SetsRoute = ({ match }) => {
  return (
    <Switch>
      <Route
        path={`${match.path}/create`}
        component={SetsCreateRoute}
        exact
      />
      <Route
        path={`${match.path}/:id/edit`}
        component={SetsEditRoute}
        exact
      />
      <Route
        path={`${match.path}/:id/view`}
        component={SetsViewRoute}
        exact
      />
      <Route
        path={`${match.path}`}
        component={SetsListRoute}
      />
    </Switch>
  );
};

SetsRoute.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};

export default withRouter(SetsRoute);
