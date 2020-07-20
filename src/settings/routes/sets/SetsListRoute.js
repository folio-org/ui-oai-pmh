import React from 'react';
import PropTypes from 'prop-types';

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
    path: 'oai-pmh/sets',
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

export default stripesConnect(SetsListRoute);
