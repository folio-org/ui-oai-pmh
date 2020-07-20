/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useCallback,
  useState,
  useEffect,
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
} from '../../util';
import useCallout from '../../hooks';
import {
  FILL_PANE_WIDTH,
  SET_FIELDS,
  SET_FIELDS_INITIAL_VALUES,
} from '../../constants';

const SetsEditRoute = ({
  history,
  location,
  mutator,
  stripes,
}) => {
  const [sets, setSets] = useState({});
  const [isLoaded, setIsLoaded] = useState(true);
  const [isFailed, setIsFailed] = useState(true);

  const formatToViewData = (set) => {
    return {
      [SET_FIELDS.ID]: set[SET_FIELDS.ID],
      [SET_FIELDS.NAME]: set[SET_FIELDS.NAME],
      [SET_FIELDS.DESCRIPTION]: set[SET_FIELDS.DESCRIPTION] || SET_FIELDS_INITIAL_VALUES.DESCRIPTION,
      [SET_FIELDS.METADATA]: {
        [SET_FIELDS.CREATED_DATE]: set[SET_FIELDS.CREATED_DATE],
        [SET_FIELDS.CREATED_BY_USER_ID]: set[SET_FIELDS.CREATED_BY_USER_ID],
        [SET_FIELDS.UPDATED_DATE]: set[SET_FIELDS.UPDATED_DATE],
        [SET_FIELDS.UPDATED_BY_USER_ID]: set[SET_FIELDS.UPDATED_BY_USER_ID],
      },
    };
  };

  const formatFromViewData = (set) => {
    return {
      [SET_FIELDS.ID]: set[SET_FIELDS.ID],
      [SET_FIELDS.NAME]: set[SET_FIELDS.NAME],
      [SET_FIELDS.DESCRIPTION]: set[SET_FIELDS.DESCRIPTION] || SET_FIELDS_INITIAL_VALUES.DESCRIPTION,
      [SET_FIELDS.CREATED_DATE]: set[SET_FIELDS.METADATA][SET_FIELDS.CREATED_DATE],
      [SET_FIELDS.CREATED_BY_USER_ID]: set[SET_FIELDS.METADATA][SET_FIELDS.CREATED_BY_USER_ID],
      [SET_FIELDS.UPDATED_DATE]: set[SET_FIELDS.METADATA][SET_FIELDS.UPDATED_DATE],
      [SET_FIELDS.UPDATED_BY_USER_ID]: set[SET_FIELDS.METADATA][SET_FIELDS.UPDATED_BY_USER_ID],
    };
  };

  useEffect(
    () => {
      setIsLoaded(false);
      setIsFailed(false);
      mutator.editSets.GET()
        .then(setResponse => setSets(formatToViewData(setResponse)))
        .then(() => setIsLoaded(true))
        .catch(() => {
          setIsLoaded(true);
          setIsFailed(true);
        });
    },
    [],
  );

  const getTitle = () => (
    <FormattedMessage
      id="ui-oai-pmh.settings.sets.edit.title"
      values={{ name: sets[SET_FIELDS.NAME] }}
    />
  );
  const showCallout = useCallout();
  const onSubmit = useCallback((values) => {
    mutator.editSets.PUT(formatFromViewData(values))
      .then((response) => {
        showCallout({
          message: <FormattedMessage
            id="ui-oai-pmh.settings.sets.callout.updated"
            values={{ name: response[SET_FIELDS.NAME] }}
          />,
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
  }, [showCallout, location.search, history, mutator.editSets, sets[SET_FIELDS.ID]]);
  const onBack = useCallback(() => {
    history.push({
      pathname:  getSetsViewUrl(sets[SET_FIELDS.ID]),
      search: location.search,
    });
  }, [history, location.search, sets[SET_FIELDS.ID]]);
  const onBackForNotFound = useCallback(() => {
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
          onBack={onBackForNotFound}
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
    />
  );
};

SetsEditRoute.manifest = Object.freeze({
  editSets: {
    type: 'okapi',
    path: 'oai-pmh/set/:{id}',
    clientGeneratePk: false,
    throwErrors: false,
    PUT: {
      path: 'oai-pmh/set/:{id}',
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
