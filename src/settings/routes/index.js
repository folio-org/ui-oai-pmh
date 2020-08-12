import React from 'react';
import {
  withRouter,
  Route,
  Switch,
} from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';

import {
  SetsCreateRoute,
  SetsDuplicateRoute,
  SetsListRoute,
  SetsEditRoute,
  SetsViewRoute,
  SetsRootLayer,
} from './sets';

const SetsRoute = ({ match }) => {
  return (
    <SetsRootLayer>
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
          path={`${match.path}/:id/duplicate`}
          component={SetsDuplicateRoute}
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
    </SetsRootLayer>
  );
};

SetsRoute.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};

export default withRouter(SetsRoute);
