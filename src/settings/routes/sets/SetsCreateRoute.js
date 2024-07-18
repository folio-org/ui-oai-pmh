import React, {
  useContext,
  useMemo,
} from 'react';
import {
  FormattedMessage,
  useIntl,
} from 'react-intl';
import { useHistory } from 'react-router-dom';
import { useQueryClient } from 'react-query';

import { useStripes } from '@folio/stripes/core';

import {
  SetsForm,
} from '../../components';
import {
  generalInformationToViewData,
  filteringConditionsToFormData,
  getSetsListUrl,
  getSetsViewUrl,
  filteringConditionsDataOptions,
  setInformationToViewData,
  handleErrorResponse,
  isFilteringConditionsFilled,
} from '../../util';
import {
  useCallout,
} from '../../hooks';
import {
  CALLOUT_ERROR_TYPE,
  SET_FIELDS,
  SET_FIELDS_INITIAL_VALUES,
} from '../../constants';
import SetsContext from './SetsContext';
import { useSetCreate } from '../../hooks/useSetCreate';
import { SETS } from '../../hooks/useSets';


const SetsCreateRoute = () => {
  const queryClient = useQueryClient();
  const intl = useIntl();
  const history = useHistory();
  const showCallout = useCallout();
  const stripes = useStripes();
  const { setsFilteringConditions } = useContext(SetsContext);

  const { search } = history.location;

  const { createSet } = useSetCreate({
    onSuccess: (response) => {
      showCallout({
        message: <FormattedMessage id="ui-oai-pmh.settings.sets.callout.created" />,
      });
      history.push({
        pathname: getSetsViewUrl(response[SET_FIELDS.ID]),
        search,
      });

      queryClient.invalidateQueries(SETS);
    },
    onError: (errors) => handleErrorResponse(errors, showCallout),
  });

  const getFilteringConditionsDataOptions = useMemo(() => (
    filteringConditionsDataOptions(setsFilteringConditions, intl)
  ), [setsFilteringConditions]);

  const onSubmit = (values) => {
    if (!isFilteringConditionsFilled(values.filteringConditions)) {
      showCallout({
        type: CALLOUT_ERROR_TYPE,
        message: <FormattedMessage id="ui-oai-pmh.settings.sets.callout.validationError.empty.setSpec" />,
      });
    } else {
      createSet(setInformationToViewData(values));
    }
  };

  const onBack = () => {
    history.push({
      pathname: getSetsListUrl(),
      search,
    });
  };

  const getTitle = () => <FormattedMessage id="ui-oai-pmh.settings.sets.new.title" />;

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

export default SetsCreateRoute;
