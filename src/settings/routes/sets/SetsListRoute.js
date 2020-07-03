import React from 'react';
import PropTypes from 'prop-types';
import {
  withRouter,
} from 'react-router-dom';

import {
  stripesConnect,
} from '@folio/stripes/core';

import {
  SetsList,
} from '../../components/Sets';

const SetsListRoute = () => {
  return (
    <SetsList />
  );
};

SetsListRoute.manifest = Object.freeze({
  setsRecords: {
    type: 'okapi',
    path: 'sets',
    fetch: false,
    accumulate: true,
  },
});

SetsListRoute.propTypes = {
  mutator: PropTypes.shape({
    setsRecords: PropTypes.shape({
      GET: PropTypes.func.isRequired,
    }),
  }),
};

export default withRouter(stripesConnect(SetsListRoute));
