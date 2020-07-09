import React from 'react';
import PropTypes from 'prop-types';

import {
  stripesConnect,
} from '@folio/stripes-core';

import {
  SetsView,
} from '../../components/Sets';

const SetsViewRoute = () => {
  return (
    <SetsView />
  );
};

SetsViewRoute.manifest = Object.freeze({
  viewSets: {
    type: 'okapi',
    path: 'set/:{id}',
    clientGeneratePk: false,
    throwErrors: false,
    accumulate: 'true',
    fetch: false,
    DELETE: {
      path: 'set/:{id}'
    }
  }
});

SetsViewRoute.propTypes = {
  mutator: PropTypes.shape({
    viewSets: PropTypes.shape({
      DELETE: PropTypes.func.isRequired,
      GET: PropTypes.func.isRequired,
    })
  })
};

export default stripesConnect(SetsViewRoute);
