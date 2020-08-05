import React, {
  useCallback,
} from 'react';
import PropTypes from 'prop-types';

import {
  Pane,
} from '@folio/stripes/components';

import ActionItem from './common/ActionItem';
import {
  FirstMenu,
} from '../SetsForm/components';

import {
  FILL_PANE_WIDTH,
  ICONS,
} from '../../../constants';

const SetsView = ({
  showActionMenu,
  paneTitle,
  onBack,
  onDelete,
  onDuplicate,
  onEdit,
}) => {
  const getFirstMenu = useCallback(() => (
    <FirstMenu onClickHandler={onBack} />
  ), [onBack]);

  // eslint-disable-next-line react/prop-types
  const getActionMenu = ({ onToggle }) => {
    return showActionMenu ? (
      <>
        <ActionItem
          id="editSetAction"
          icon={ICONS.EDIT}
          buttonTextTranslationKey="ui-oai-pmh.settings.sets.action.edit"
          onClickHandler={onEdit}
          onToggle={onToggle}
        />
        <ActionItem
          id="duplicateSetAction"
          icon={ICONS.DUPLICATE}
          buttonTextTranslationKey="ui-oai-pmh.settings.sets.action.duplicate"
          onClickHandler={onDuplicate}
          onToggle={onToggle}
        />
        <ActionItem
          id="deleteSetAction"
          icon={ICONS.DELETE}
          buttonTextTranslationKey="ui-oai-pmh.settings.sets.action.delete"
          onClickHandler={onDelete}
          onToggle={onToggle}
        />
      </>
    ) : null;
  };

  return (
    <Pane
      data-sets-view
      defaultWidth={FILL_PANE_WIDTH}
      paneTitle={paneTitle()}
      firstMenu={getFirstMenu()}
      actionMenu={getActionMenu}
    />
  );
};

SetsView.propTypes = {
  showActionMenu: PropTypes.bool.isRequired,
  paneTitle: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onDuplicate: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default SetsView;
