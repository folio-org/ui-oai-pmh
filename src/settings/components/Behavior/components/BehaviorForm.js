import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import {
  Pane,
  PaneFooter,
  Select,
} from '@folio/stripes/components';
import stripesFinalForm from '@folio/stripes/final-form';
import { useStripes } from '@folio/stripes/core';

import {
  OaiNotificationWrapper,
  RowComponent,
  SaveButton,
} from '../../common';
import {
  DEFAULT_PANE_WIDTH,
  BEHAVIOR_FORM_NAME,
} from '../../../constants';
import css from '../../common/Form.css';

const deletedRecordsSupportSelectValues = (formatMessage) => [
  {
    value: 'no',
    label: formatMessage({ id: 'ui-oai-pmh.settings.behavior.deletedRecordsSupport.no' }),
  },
  {
    value: 'transient',
    label: formatMessage({ id: 'ui-oai-pmh.settings.behavior.deletedRecordsSupport.transient' }),
  },
  {
    value: 'persistent',
    label: formatMessage({ id: 'ui-oai-pmh.settings.behavior.deletedRecordsSupport.persistent' }),
  },
];

const suppressedRecordsProcessingSelectValues = (formatMessage) => [
  {
    value: 'true',
    label: formatMessage({ id: 'ui-oai-pmh.settings.behavior.suppressedRecordsProcessing.true' }),
  },
  {
    value: 'false',
    label: formatMessage({ id: 'ui-oai-pmh.settings.behavior.suppressedRecordsProcessing.false' }),
  },
];

const errorsProcessingSelectValues = (formatMessage) => [
  {
    value: '200',
    label: formatMessage({ id: 'ui-oai-pmh.settings.behavior.errorsProcessing.200' }),
  },
  {
    value: '500',
    label: formatMessage({ id: 'ui-oai-pmh.settings.behavior.errorsProcessing.500' }),
  },
];

const recordsSource = (formatMessage) => [
  {
    value: 'Source record storage',
    label: formatMessage({ id: 'ui-oai-pmh.settings.behavior.record.storage' })
  },
  {
    value: 'Inventory',
    label: formatMessage({ id: 'ui-oai-pmh.settings.behavior.record.inventory' })
  },
  {
    value: 'Source record storage and Inventory',
    label: formatMessage({ id: 'ui-oai-pmh.settings.behavior.record.inventory-storage' })
  }
];

const BehaviorForm = ({
  label,
  pristine,
  submitting,
  handleSubmit
}) => {
  const stripes = useStripes();
  const { formatMessage } = useIntl();

  const renderFooter = () => {
    const disabled = pristine || submitting || !stripes.hasPerm('ui-oai-pmh.settings.edit');
    return (
      <PaneFooter
        renderEnd={(
          <SaveButton
            data-test-behavior-form-button-save
            disabled={disabled}
            showTooltip={!stripes.hasPerm('ui-oai-pmh.settings.edit')}
          />
        )}
      />
    );
  };

  return (
    <form
      id={BEHAVIOR_FORM_NAME}
      noValidate
      className={css.form}
      onSubmit={handleSubmit}
    >
      <Pane
        defaultWidth={DEFAULT_PANE_WIDTH}
        fluidContentWidth
        paneTitle={label}
        footer={renderFooter()}
      >
        <OaiNotificationWrapper />
        <RowComponent
          data-test-deleted-records-support
          id="deletedRecordsSupport"
          label="ui-oai-pmh.settings.behavior.label.deletedRecordsSupport"
          tooltip="ui-oai-pmh.settings.behavior.tooltip.deletedRecordsSupport"
          dataOptions={deletedRecordsSupportSelectValues(formatMessage)}
          component={Select}
        />
        <RowComponent
          data-test-suppressed-records-processing
          id="suppressedRecordsProcessing"
          label="ui-oai-pmh.settings.behavior.label.suppressedRecordsProcessing"
          tooltip="ui-oai-pmh.settings.behavior.tooltip.suppressedRecordsProcessing"
          dataOptions={suppressedRecordsProcessingSelectValues(formatMessage)}
          component={Select}
        />
        <RowComponent
          data-test-errors-processing
          id="errorsProcessing"
          label="ui-oai-pmh.settings.behavior.label.errorsProcessing"
          tooltip="ui-oai-pmh.settings.behavior.tooltip.errorsProcessing"
          dataOptions={errorsProcessingSelectValues(formatMessage)}
          component={Select}
        />
        <RowComponent
          data-test-errors-processing
          id="recordsSource"
          label="ui-oai-pmh.settings.behavior.label.recordSource"
          tooltip="ui-oai-pmh.settings.behavior.tooltip.recordSource"
          dataOptions={recordsSource(formatMessage)}
          component={Select}
        />
      </Pane>
    </form>
  );
};

BehaviorForm.propTypes = {
  label: PropTypes.node.isRequired,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
};

export default stripesFinalForm({
  navigationCheck: true,
})(BehaviorForm);
