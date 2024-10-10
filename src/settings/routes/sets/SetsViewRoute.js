import React, {
  useContext,
  useState,
} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useQueryClient } from 'react-query';

import {
  LoadingPane,
  ConfirmationModal,
} from '@folio/stripes/components';
import { useStripes } from '@folio/stripes/core';

import SetsContext from './SetsContext';
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
  generalInformationToViewData,
  metaDataToViewData,
} from '../../util';
import {
  useCallout,
} from '../../hooks';
import {
  DEFAULT_PANE_WIDTH,
  CALLOUT_ERROR_TYPE,
  ENTITY_NOT_FOUND_STATUS_CODE,
  FILL_PANE_WIDTH,
  SET_FIELDS,
} from '../../constants';
import { useSetDetails } from '../../hooks/useSetDetails';
import { useSetDelete } from '../../hooks/useSetDelete';
import { SETS } from '../../hooks/useSets';


const SetsViewRoute = () => {
  const { setsFilteringConditions } = useContext(SetsContext);
  const queryClient = useQueryClient();
  const showCallout = useCallout();
  const stripes = useStripes();
  const { id } = useParams();
  const history = useHistory();
  const { search } = history.location;
  const showActionMenu = stripes.hasPerm('ui-oai-pmh.settings.edit');

  const [isConfirmDeleteSetsModalOpen, setConfirmDeleteSetsModalOpen] = useState(false);

  const { setDetails, isError, isSetLoading } = useSetDetails(id);
  const { deleteSet } = useSetDelete({
    onSuccess: () => {
      showCallout({
        message: <FormattedMessage id="ui-oai-pmh.settings.sets.callout.deleted" />
      });
      history.replace({
        pathname: getSetsListUrl(),
        search,
      });

      queryClient.invalidateQueries(SETS);
    },
    onError: ({ status }) => {
      if (status === ENTITY_NOT_FOUND_STATUS_CODE) {
        showCallout({
          type: CALLOUT_ERROR_TYPE,
          message: <FormattedMessage id="ui-oai-pmh.settings.sets.callout.failedToDelete.delete" />,
        });
      } else {
        showCallout({
          type: CALLOUT_ERROR_TYPE,
          message: <FormattedMessage id="ui-oai-pmh.settings.sets.callout.connectionProblem.delete" />,
        });
      }
    },
  });

  const sets = setDetails ? {
    ...generalInformationToViewData(setDetails),
    ...metaDataToViewData(setDetails),
    [SET_FIELDS.FILTERING_CONDITIONS]: setDetails[SET_FIELDS.FILTERING_CONDITIONS],
  } : {};

  const getTitle = () => (
    <FormattedMessage
      id="ui-oai-pmh.settings.sets.view.title"
      values={{ name: sets[SET_FIELDS.NAME] }}
    />
  );

  const confirmationModal = () => setConfirmDeleteSetsModalOpen(!isConfirmDeleteSetsModalOpen);

  const onEdit = () => {
    history.push(getSetsEditUrl(id, search));
  };

  const onDuplicate = () => {
    history.push(getSetsDuplicateUrl(id, search));
  };

  const onDelete = () => {
    setConfirmDeleteSetsModalOpen(false);

    deleteSet(id);
  };

  const onBackToList = () => {
    history.push({
      pathname:  getSetsListUrl(),
      search,
    });
  };


  if (isSetLoading) {
    return (
      <LoadingPane defaultWidth={DEFAULT_PANE_WIDTH} />
    );
  }

  if (isError) {
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
        sets={sets}
        setsFilteringConditions={setsFilteringConditions}
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

export default SetsViewRoute;
