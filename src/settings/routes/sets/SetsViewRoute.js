import React, {
  useCallback,
  useState,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { FormattedMessage } from 'react-intl';

import {
  stripesConnect,
} from '@folio/stripes-core';
import {
  LoadingPane,
  ConfirmationModal,
} from '@folio/stripes/components';

import {
  SetsView,
} from '../../components/Sets';
import {
  EntityNotFound,
} from '../../components/Sets/common';

import {
  getSetsListUrl,
  getSetsEditUrl,
  getSetsDuplicateUrl,
} from '../../util';
import useCallout from '../../hooks';
import {
  DEFAULT_PANE_WIDTH,
  ENTITY_NOT_FOUND_STATUS_CODE,
  FILL_PANE_WIDTH,
  SET_FIELDS,
} from '../../constants';

const SetsViewRoute = ({
  history,
  location,
  mutator,
  match: {
    params: {
      id,
    },
  },
  stripes,
}) => {
  const [sets, setSets] = useState({});
  const [isLoaded, setIsLoaded] = useState(true);
  const [isFailed, setIsFailed] = useState(true);
  const [isConfirmDeleteSetsModalOpen, setConfirmDeleteSetsModalOpen] = useState(false);

  const showActionMenu = stripes.hasPerm('ui-oai-pmh.edit');

  const showCallout = useCallout();

  useEffect(
    () => {
      setIsLoaded(false);
      setIsFailed(false);
      mutator.viewSets.GET()
        .then(setResponse => setSets(setResponse))
        .then(() => setIsLoaded(true))
        .catch(() => {
          setIsLoaded(true);
          setIsFailed(true);
        });
    },
    [id],
  );

  const getTitle = () => (
    <FormattedMessage
      id="ui-oai-pmh.settings.sets.view.title"
      values={{ name: sets[SET_FIELDS.NAME] }}
    />
  );

  const confirmationModal = () => setConfirmDeleteSetsModalOpen(!isConfirmDeleteSetsModalOpen);

  const onEdit = useCallback(() => {
    history.push(getSetsEditUrl(id, location.search));
  }, [location.search, history, id]);

  const onDuplicate = useCallback(() => {
    history.push(getSetsDuplicateUrl(id, location.search));
  }, [location.search, history, id]);

  const onDelete = () => {
    setConfirmDeleteSetsModalOpen(false);
    mutator.viewSets.DELETE({ id })
      .then(() => {
        showCallout({
          message: <FormattedMessage id="ui-oai-pmh.settings.sets.callout.deleted" />
        });
        history.replace({
          pathname: getSetsListUrl(),
          search: location.search,
        });
      })
      .catch(({ status }) => {
        if (status === ENTITY_NOT_FOUND_STATUS_CODE) {
          showCallout({
            type: 'error',
            message: <FormattedMessage id="ui-oai-pmh.settings.sets.callout.failedToDelete.delete" />,
          });
        } else {
          showCallout({
            type: 'error',
            message: <FormattedMessage id="ui-oai-pmh.settings.sets.callout.connectionProblem.delete" />,
          });
        }
      });
  };

  const onBackToList = useCallback(() => {
    history.push({
      pathname:  getSetsListUrl(),
      search: location.search,
    });
  }, [history, location.search]);

  if (!isLoaded) {
    return (
      <LoadingPane defaultWidth={DEFAULT_PANE_WIDTH} />
    );
  }

  if (isFailed) {
    return (
      <EntityNotFound
        pageTitleTranslationKey="ui-oai-pmh.settings.sets.view.notFound.title"
        errorTextTranslationKey="ui-oai-pmh.settings.sets.view.notFound.text"
        paneWidth={FILL_PANE_WIDTH}
        onBack={onBackToList}
      />
    );
  }

  return (
    <>
      <SetsView
        showActionMenu={showActionMenu}
        paneTitle={getTitle}
        onBack={onBackToList}
        onDelete={confirmationModal}
        onDuplicate={onDuplicate}
        onEdit={onEdit}
      />
      <ConfirmationModal
        id="confirm-delete-sets-modal"
        open={isConfirmDeleteSetsModalOpen}
        heading={<FormattedMessage id="ui-oai-pmh.settings.confirmDeleteSetsModal.heading" />}
        message={<FormattedMessage
          id="ui-oai-pmh.settings.confirmDeleteSetsModal.message"
          values={{ name: sets[SET_FIELDS.NAME] }}
        />}
        confirmLabel={<FormattedMessage id="ui-oai-pmh.settings.confirmDeleteSetsModal.confirm" />}
        cancelLabel={<FormattedMessage id="ui-oai-pmh.settings.confirmDeleteSetsModal.cancel" />}
        onConfirm={onDelete}
        onCancel={confirmationModal}
      />
    </>
  );
};

SetsViewRoute.manifest = Object.freeze({
  viewSets: {
    type: 'okapi',
    path: 'oai-pmh/sets/:{id}',
    clientGeneratePk: false,
    throwErrors: false,
    accumulate: 'true',
    fetch: false,
    DELETE: {
      path: 'oai-pmh/sets/:{id}'
    }
  }
});

SetsViewRoute.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
  stripes: PropTypes.shape({
    hasPerm: PropTypes.func.isRequired,
  }).isRequired,
  mutator: PropTypes.shape({
    viewSets: PropTypes.shape({
      DELETE: PropTypes.func.isRequired,
      GET: PropTypes.func.isRequired,
    })
  })
};

export default stripesConnect(SetsViewRoute);
