import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
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

const SetsDuplicateRoute = ({
  history,
  location,
  mutator,
  stripes,
  match: {
    params: {
      id,
    },
  },
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
      mutator.duplicateSets.GET()
        .then(setResponse => setSets({
          ...generalInformationToViewData(setResponse),
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

  const getTitle = () => <FormattedMessage id="ui-oai-pmh.settings.sets.new.title" />;

  const showCallout = useCallout();

  const onSubmit = useCallback((values) => {
    if (!isFilteringConditionsFilled(values.filteringConditions)) {
      showCallout({
        type: CALLOUT_ERROR_TYPE,
        message: <FormattedMessage id="ui-oai-pmh.settings.sets.callout.validationError.empty.setSpec" />,
      });
    } else {
      mutator.duplicateSets.POST({
        ...setInformationToViewData(values),
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
        .catch((errors) => handleErrorResponse(errors, showCallout));
    }
  }, [showCallout, location.search, history, mutator.duplicateSets, sets[SET_FIELDS.ID]]);

  const onBack = useCallback(() => {
    history.push({
      pathname:  getSetsViewUrl(id),
      search: location.search,
    });
  }, [history, location.search, id]);

  const onBackEntityNotFoundForDuplicate = useCallback(() => {
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

SetsDuplicateRoute.manifest = Object.freeze({
  duplicateSets: {
    type: 'okapi',
    path: 'oai-pmh/sets/:{id}',
    clientGeneratePk: false,
    throwErrors: false,
    POST: {
      path: 'oai-pmh/sets',
    },
    accumulate: 'true',
    fetch: false,
  },
});

SetsDuplicateRoute.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
  mutator: PropTypes.shape({
    duplicateSets: PropTypes.shape({
      GET: PropTypes.func.isRequired,
      POST: PropTypes.func.isRequired,
    }),
  }),
  stripes: PropTypes.shape({
    hasPerm: PropTypes.func.isRequired,
  }).isRequired,
};

export default stripesConnect(SetsDuplicateRoute);
