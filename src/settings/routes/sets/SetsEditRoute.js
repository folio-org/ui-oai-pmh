import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
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
  LoadingPane,
} from '@folio/stripes/components';

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

const SetsEditRoute = ({
  history,
  location,
  mutator,
  stripes,
}) => {
  const intl = useIntl();
  const {
    setsFilteringConditions,
  } = useContext(SetsContext);

  const [sets, setSets] = useState({});
  const [isLoaded, setIsLoaded] = useState(true);
  const [isFailed, setIsFailed] = useState(true);

  const getFilteringConditionsDataOptions = useMemo(() => (
    filteringConditionsDataOptions(setsFilteringConditions, intl)
  ), [setsFilteringConditions]);

  useEffect(
    () => {
      setIsLoaded(false);
      setIsFailed(false);
      mutator.editSets.GET()
        .then(setResponse => setSets({
          [SET_FIELDS.ID]: setResponse[SET_FIELDS.ID],
          ...generalInformationToViewData(setResponse),
          ...metaDataToViewData(setResponse),
          ...filteringConditionsToFormData(setResponse[SET_FIELDS.FILTERING_CONDITIONS], setsFilteringConditions),
        }))
        .then(() => setIsLoaded(true))
        .catch(() => {
          setIsLoaded(true);
          setIsFailed(true);
        });
    },
    [setsFilteringConditions],
  );

  const getTitle = () => (
    <FormattedMessage
      id="ui-oai-pmh.settings.sets.edit.title"
      values={{ name: sets[SET_FIELDS.NAME] }}
    />
  );

  const showCallout = useCallout();

  const onSubmit = useCallback((values) => {
    if (!isFilteringConditionsFilled(values.filteringConditions)) {
      showCallout({
        type: CALLOUT_ERROR_TYPE,
        message: <FormattedMessage id="ui-oai-pmh.settings.sets.callout.validationError.empty.setSpec" />,
      });
    } else {
      mutator.editSets.PUT({
        [SET_FIELDS.ID]: values[SET_FIELDS.ID],
        ...setInformationToViewData(values),
      })
        .then((response) => {
          showCallout({
            message: <FormattedMessage id="ui-oai-pmh.settings.sets.callout.updated" />,
          });
          history.push({
            pathname: getSetsViewUrl(response[SET_FIELDS.ID]),
            search: location.search,
          });
        })
        .catch((errors) => handleErrorResponse(errors, showCallout));
    }
  }, [showCallout, location.search, history, mutator.editSets, sets[SET_FIELDS.ID]]);

  const onBack = useCallback(() => {
    history.push({
      pathname:  getSetsViewUrl(sets[SET_FIELDS.ID]),
      search: location.search,
    });
  }, [history, location.search, sets[SET_FIELDS.ID]]);

  const onBackEntityNotFoundForEdit = useCallback(() => {
    history.push({
      pathname:  getSetsListUrl(),
      search: location.search,
    });
  }, [history, location.search]);

  if (!isLoaded) {
    return (
      <SetsWrapper>
        <LoadingPane defaultWidth={FILL_PANE_WIDTH} />
      </SetsWrapper>
    );
  }

  if (isFailed) {
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

SetsEditRoute.manifest = Object.freeze({
  editSets: {
    type: 'okapi',
    path: 'oai-pmh/sets/:{id}',
    clientGeneratePk: false,
    throwErrors: false,
    PUT: {
      path: 'oai-pmh/sets/:{id}',
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
  stripes: PropTypes.shape({
    hasPerm: PropTypes.func.isRequired,
  }).isRequired,
};

export default stripesConnect(SetsEditRoute);
