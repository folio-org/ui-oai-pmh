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
} from '../../components';
import {
  getSetsListUrl,
  getSetsViewUrl,
} from '../../util';
import useCallout from '../../hooks';
import {
  SET_FIELDS,
  SET_FIELDS_INITIAL_VALUES,
} from '../../constants';

const SetsCreateRoute = ({
  history,
  location,
  mutator,
  stripes,
}) => {
  const getTitle = () => <FormattedMessage id="ui-oai-pmh.settings.sets.new.title" />;
  const showCallout = useCallout();
  const onSubmit = useCallback((values) => {
    mutator.createSets.POST(values)
      .then((response) => {
        showCallout({
          message: <FormattedMessage id="ui-oai-pmh.settings.sets.callout.created" />,
        });
        history.push({
          pathname: getSetsViewUrl(response[SET_FIELDS.ID]),
          search: location.search,
        });
      })
      .catch(() => {
        showCallout({
          type: 'error',
          message: <FormattedMessage id="ui-oai-pmh.settings.sets.callout.connectionProblem" />,
        });
      });
  }, [showCallout, location.search, history, mutator.createSets]);

  const onBack = useCallback(() => {
    history.push({
      pathname: getSetsListUrl(),
      search: location.search,
    });
  }, [history, location.search]);

  return (
    <SetsForm
      initialValues={SET_FIELDS_INITIAL_VALUES}
      formTitle={getTitle}
      stripes={stripes}
      onSubmit={onSubmit}
      onBack={onBack}
    />
  );
};

SetsCreateRoute.manifest = Object.freeze({
  createSets: {
    type: 'okapi',
    path: 'oai-pmh/set',
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
      POST: PropTypes.func.isRequired,
    }),
  }),
  stripes: PropTypes.shape({
    hasPerm: PropTypes.func.isRequired,
  }).isRequired,
};

export default stripesConnect(SetsCreateRoute);
