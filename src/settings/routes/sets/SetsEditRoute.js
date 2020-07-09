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
  getSetsListUrl,
} from '../../util';

const SetsEditRoute = ({
  history,
  location,
}) => {
  const getTitle = () => <FormattedMessage id="ui-oai-pmh.settings.sets.edit.title" />;
  const onSubmit = () => {};
  const onBack = useCallback(() => {
    history.push({
      pathname: getSetsListUrl(),
      search: location.search,
    });
  }, [history, location.search]);

  return (
    <SetsForm
      initialValues={{}}
      formTitle={getTitle}
      onSubmit={onSubmit}
      onBack={onBack}
    />
  );
};

SetsEditRoute.manifest = Object.freeze({
  editSets: {
    type: 'okapi',
    path: 'set/:{id}',
    clientGeneratePk: false,
    throwErrors: false,
    PUT: {
      path: 'set/:{id}',
    },
    accumulate: 'true',
    fetch: false,
  },
});

SetsEditRoute.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
  mutator: PropTypes.shape({
    editSets: PropTypes.shape({
      GET: PropTypes.func.isRequired,
      PUT: PropTypes.func.isRequired,
    }),
  }),
};

export default stripesConnect(SetsEditRoute);
