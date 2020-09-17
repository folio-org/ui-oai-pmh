import React, {
  useCallback,
} from 'react';
import PropTypes from 'prop-types';

import {
  Pane,
  Row,
  Col,
  AccordionStatus,
  AccordionSet,
  ExpandAllButton,
  Headline,
} from '@folio/stripes/components';

import {
  ActionItem,
  GeneralInformation,
  FilteringConditions,
} from './components';
import {
  FirstMenu,
} from '../SetsForm/components';

import {
  DEFAULT_PANE_WIDTH,
  ICONS,
  SET_FIELDS,
  INITIAL_ACCORDION_STATE,
} from '../../../constants';

import css from './SetsView.css';

const SetsView = ({
  sets,
  showActionMenu,
  paneTitle,
  onBack,
  onDelete,
  onDuplicate,
  onEdit,
  setsFilteringConditions,
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
      defaultWidth={DEFAULT_PANE_WIDTH}
      paneTitle={paneTitle()}
      firstMenu={getFirstMenu()}
      actionMenu={getActionMenu}
    >
      <AccordionStatus>
        <Row>
          <Col xs={9}>
            <Headline
              data-test-sets-view-headline
              size="x-large"
              tag="h2"
              margin="small"
              className={css.HeadLine}
            >
              {sets[SET_FIELDS.NAME]}
            </Headline>
          </Col>
          <Col xs={3}>
            <Row end="xs">
              <Col
                data-test-expand-all-button
                xs
              >
                <ExpandAllButton />
              </Col>
            </Row>
          </Col>
        </Row>
        <AccordionSet initialStatus={INITIAL_ACCORDION_STATE}>
          <GeneralInformation sets={sets} />
          <FilteringConditions
            filteringConditions={sets[SET_FIELDS.FILTERING_CONDITIONS]}
            setsFilteringConditions={setsFilteringConditions}
          />
        </AccordionSet>
      </AccordionStatus>
    </Pane>
  );
};

SetsView.propTypes = {
  sets: PropTypes.object.isRequired,
  showActionMenu: PropTypes.bool.isRequired,
  paneTitle: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onDuplicate: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  setsFilteringConditions: PropTypes.arrayOf(PropTypes.object),
};

export default SetsView;
