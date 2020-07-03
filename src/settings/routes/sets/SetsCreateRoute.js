import React, {
  useCallback,
} from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import {
  FormattedMessage,
} from 'react-intl';

import {
  stripesConnect,
} from '@folio/stripes-core';

import {
  SetsForm,
} from '../../components/Sets';
import {
  SETS_INITIAL_VALUES,
} from '../../constants';
import {
  getSetsListUrl,
} from '../../util';

const SetsCreateRoute = ({
  history,
  location,
}) => {
  const getTitle = () => <FormattedMessage id="ui-oai-pmh.settings.sets.new.title" />;
  const onSubmit = () => {};
  const onBack = useCallback(() => {
    history.push({
      pathname: getSetsListUrl(),
      search: location.search,
    });
  }, [history, location.search]);

  return (
    <SetsForm
      initialValues={SETS_INITIAL_VALUES}
      formTitle={getTitle}
      onSubmit={onSubmit}
      onBack={onBack}
    />
  );
};

SetsCreateRoute.manifest = Object.freeze({
  createSets: {
    type: 'okapi',
    path: 'set',
    clientGeneratePk: false,
    throwErrors: false,
    fetch: false,
  },
});

SetsCreateRoute.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
  mutator: PropTypes.shape({
    createSets: PropTypes.shape({
      POST: PropTypes.func.isRequired
    }),
  }),
};

export default stripesConnect(SetsCreateRoute);
