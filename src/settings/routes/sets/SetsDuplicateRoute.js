import React, { useContext } from 'react';
import { useQueryClient } from 'react-query';
import { useHistory, useParams } from 'react-router-dom';
import {
  FormattedMessage,
  useIntl,
} from 'react-intl';

import { LoadingPane } from '@folio/stripes/components';
import { useStripes } from '@folio/stripes/core';

import { SetsForm } from '../../components';
import {
  EntityNotFound,
  SetsWrapper,
} from '../../components/Sets/common';
import {
  getSetsListUrl,
  getSetsViewUrl,
  generalInformationToViewData,
  filteringConditionsToFormData,
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
  FILL_PANE_WIDTH,
  SET_FIELDS,
} from '../../constants';
import SetsContext from './SetsContext';
import { useSetDetails } from '../../hooks/useSetDetails';
import { useSetCreate } from '../../hooks/useSetCreate';
import { SETS } from '../../hooks/useSets';


const SetsDuplicateRoute = () => {
  const { setsFilteringConditions } = useContext(SetsContext);
  const intl = useIntl();
  const queryClient = useQueryClient();
  const showCallout = useCallout();
  const stripes = useStripes();
  const { id } = useParams();
  const history = useHistory();
  const { search } = history.location;

  const { setDetails, isError, isSetLoading } = useSetDetails(id);
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
    onError: (err) => handleErrorResponse(err, showCallout),
  });

  const getFilteringConditionsDataOptions = filteringConditionsDataOptions(setsFilteringConditions, intl);

  const sets = setDetails ? {
    ...generalInformationToViewData(setDetails),
    ...filteringConditionsToFormData(setDetails[SET_FIELDS.FILTERING_CONDITIONS], setsFilteringConditions),
  } : {};

  const getTitle = () => <FormattedMessage id="ui-oai-pmh.settings.sets.new.title" />;

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
      pathname:  getSetsViewUrl(id),
      search,
    });
  };

  const onBackEntityNotFoundForDuplicate = () => {
    history.push({
      pathname:  getSetsListUrl(),
      search,
    });
  };


  if (isSetLoading) {
    return (
      <SetsWrapper>
        <LoadingPane defaultWidth={FILL_PANE_WIDTH} />
      </SetsWrapper>
    );
  }

  if (isError) {
    return (
      <SetsWrapper>
        <EntityNotFound
          pageTitleTranslationKey="ui-oai-pmh.settings.sets.duplicate.notFound.title"
          errorTextTranslationKey="ui-oai-pmh.settings.sets.duplicate.notFound.text"
          paneWidth={FILL_PANE_WIDTH}
          onBack={onBackEntityNotFoundForDuplicate}
        />
      </SetsWrapper>
    );
  }

  return (
    <SetsForm
      initialValues={sets}
      formTitle={getTitle}
      stripes={stripes}
      onSubmit={onSubmit}
      onBack={onBack}
      filteringConditionsDataOptions={getFilteringConditionsDataOptions}
    />
  );
};

export default SetsDuplicateRoute;
