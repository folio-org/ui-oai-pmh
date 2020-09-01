import React, {
  useCallback,
  useContext,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import {
  FormattedMessage,
  useIntl,
} from 'react-intl';

import {
  stripesConnect,
} from '@folio/stripes-core';

import {
  SetsForm,
} from '../../components';
import {
  generalInformationToViewData,
  filteringConditionsToFormData,
  getSetsListUrl,
  getSetsViewUrl,
  filteringConditionsToDtoFormat,
  filteringConditionsDataOptions,
  setSpecFromFilteringConditions,
} from '../../util';
import useCallout from '../../hooks';
import {
  CALLOUT_ERROR_TYPE,
  SET_FIELDS,
  SET_FIELDS_INITIAL_VALUES,
} from '../../constants';
import SetsContext from './SetsContext';

const SetsCreateRoute = ({
  history,
  location,
  mutator,
  stripes,
}) => {
  const intl = useIntl();
  const {
    setsFilteringConditions,
  } = useContext(SetsContext);

  const getFilteringConditionsDataOptions = useMemo(() => (
    filteringConditionsDataOptions(setsFilteringConditions, intl)
  ), [setsFilteringConditions]);

  const getTitle = () => <FormattedMessage id="ui-oai-pmh.settings.sets.new.title" />;
  const showCallout = useCallout();
  const onSubmit = useCallback((values) => {
    mutator.createSets.POST({
      ...generalInformationToViewData(values),
      ...filteringConditionsToDtoFormat(values[SET_FIELDS.FILTERING_CONDITIONS]),
      ...setSpecFromFilteringConditions(filteringConditionsToDtoFormat(values[SET_FIELDS.FILTERING_CONDITIONS])),
    })
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
          type: CALLOUT_ERROR_TYPE,
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
      initialValues={{
        ...generalInformationToViewData(SET_FIELDS_INITIAL_VALUES),
        ...filteringConditionsToFormData(SET_FIELDS_INITIAL_VALUES[SET_FIELDS.FILTERING_CONDITIONS], setsFilteringConditions),
      }}
      formTitle={getTitle}
      stripes={stripes}
      onSubmit={onSubmit}
      onBack={onBack}
      filteringConditionsDataOptions={getFilteringConditionsDataOptions}
    />
  );
};

SetsCreateRoute.manifest = Object.freeze({
  createSets: {
    type: 'okapi',
    path: 'oai-pmh/sets',
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
