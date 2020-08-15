import React, {
  useCallback,
  useEffect,
  useState,
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
  formatEditDateToViewData,
  formatViewDataToEditDate,
} from '../../util';
import useCallout from '../../hooks';
import {
  FILL_PANE_WIDTH,
  SET_FIELDS,
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

  useEffect(
    () => {
      setIsLoaded(false);
      setIsFailed(false);
      mutator.editSets.GET()
        .then(setResponse => setSets(formatEditDateToViewData(setResponse)))
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
    mutator.editSets.PUT(formatViewDataToEditDate(values))
      .then((response) => {
        showCallout({
          message: <FormattedMessage id="ui-oai-pmh.settings.sets.callout.updated" />,
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
