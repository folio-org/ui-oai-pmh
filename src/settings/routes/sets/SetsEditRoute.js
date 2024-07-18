import React, { useContext } from 'react';
import {
  FormattedMessage,
  useIntl,
} from 'react-intl';
import { useQueryClient } from 'react-query';
import { useHistory, useParams } from 'react-router-dom';

import { LoadingPane } from '@folio/stripes/components';
import { useStripes } from '@folio/stripes/core';

import {
  SetsForm,
} from '../../components';
import {
  EntityNotFound,
  SetsWrapper,
} from '../../components/Sets/common';
import {
  getSetsViewUrl,
  getSetsListUrl,
  generalInformationToViewData,
  metaDataToViewData,
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
import { useSetUpdate } from '../../hooks/useSetUpdate';
import { SETS } from '../../hooks/useSets';


const SetsEditRoute = () => {
  const intl = useIntl();
  const { setsFilteringConditions } = useContext(SetsContext);
  const queryClient = useQueryClient();
  const showCallout = useCallout();
  const stripes = useStripes();
  const { id } = useParams();
  const history = useHistory();
  const { search } = history.location;

  const { setDetails, isError, isSetLoading } = useSetDetails(id);
  const { updateSet } = useSetUpdate({
    id,
    onSuccess: (_, variables) => {
      showCallout({
        message: <FormattedMessage id="ui-oai-pmh.settings.sets.callout.updated" />,
      });
      history.push({
        pathname: getSetsViewUrl(variables[SET_FIELDS.ID]),
        search,
      });

      queryClient.invalidateQueries(SETS);
    },
    onError: (errors) => handleErrorResponse(errors, showCallout),
  });

  const sets = setDetails ? {
    [SET_FIELDS.ID]: setDetails[SET_FIELDS.ID],
    ...generalInformationToViewData(setDetails),
    ...metaDataToViewData(setDetails),
    ...filteringConditionsToFormData(setDetails[SET_FIELDS.FILTERING_CONDITIONS], setsFilteringConditions),
  } : {};

  const getFilteringConditionsDataOptions = filteringConditionsDataOptions(setsFilteringConditions, intl);

  const onSubmit = (values) => {
    if (!isFilteringConditionsFilled(values.filteringConditions)) {
      showCallout({
        type: CALLOUT_ERROR_TYPE,
        message: <FormattedMessage id="ui-oai-pmh.settings.sets.callout.validationError.empty.setSpec" />,
      });
    } else {
      updateSet({
        [SET_FIELDS.ID]: values[SET_FIELDS.ID],
        ...setInformationToViewData(values),
      });
    }
  };

  const onBack = () => {
    history.push({
      pathname:  getSetsViewUrl(sets[SET_FIELDS.ID]),
      search,
    });
  };

  const onBackEntityNotFoundForEdit = () => {
    history.push({
      pathname:  getSetsListUrl(),
      search,
    });
  };

  const getTitle = () => (
    <FormattedMessage
      id="ui-oai-pmh.settings.sets.edit.title"
      values={{ name: sets[SET_FIELDS.NAME] }}
    />
  );

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
          pageTitleTranslationKey="ui-oai-pmh.settings.sets.edit.notFound.title"
          errorTextTranslationKey="ui-oai-pmh.settings.sets.edit.notFound.text"
          paneWidth={FILL_PANE_WIDTH}
          onBack={onBackEntityNotFoundForEdit}
        />
      </SetsWrapper>
    );
  }

  return (
    <SetsForm
      initialValues={sets}
      metadata={sets.metadata}
      formTitle={getTitle}
      stripes={stripes}
      onSubmit={onSubmit}
      onBack={onBack}
      filteringConditionsDataOptions={getFilteringConditionsDataOptions}
    />
  );
};

export default SetsEditRoute;
