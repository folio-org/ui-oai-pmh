import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  IntlConsumer,
} from '@folio/stripes/core';
import {
  Pane,
  PaneFooter,
  Select,
} from '@folio/stripes/components';
import stripesFinalForm from '@folio/stripes/final-form';

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

const deletedRecordsSupportSelectValues = ({ formatMessage }) => [
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

const suppressedRecordsProcessingSelectValues = ({ formatMessage }) => [
  {
    value: 'true',
    label: formatMessage({ id: 'ui-oai-pmh.settings.behavior.suppressedRecordsProcessing.true' }),
  },
  {
    value: 'false',
    label: formatMessage({ id: 'ui-oai-pmh.settings.behavior.suppressedRecordsProcessing.false' }),
  },
];

const errorsProcessingSelectValues = ({ formatMessage }) => [
  {
    value: '200',
    label: formatMessage({ id: 'ui-oai-pmh.settings.behavior.errorsProcessing.200' }),
  },
  {
    value: '500',
    label: formatMessage({ id: 'ui-oai-pmh.settings.behavior.errorsProcessing.500' }),
  },
];

class BehaviorForm extends Component {
  static propTypes = {
    label: PropTypes.node.isRequired,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
    stripes: PropTypes.shape({
      hasPerm: PropTypes.func.isRequired,
    }).isRequired,
  };

  renderFooter = () => {
    const {
      pristine,
      submitting,
      stripes,
    } = this.props;
    const disabled = pristine || submitting || !stripes.hasPerm('ui-oai-pmh.edit');

    return (
      <PaneFooter
        renderEnd={(
          <SaveButton
            data-test-behavior-form-button-save
            disabled={disabled}
            showTooltip={!stripes.hasPerm('ui-oai-pmh.edit')}
          />
        )}
      />
    );
  };

  render() {
    const {
      label,
      handleSubmit,
    } = this.props;

    return (
      <IntlConsumer>
        {intl => (
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
              footer={this.renderFooter()}
            >
              <OaiNotificationWrapper />
              <RowComponent
                data-test-deleted-records-support
                id="deletedRecordsSupport"
                label="ui-oai-pmh.settings.behavior.label.deletedRecordsSupport"
                tooltip="ui-oai-pmh.settings.behavior.tooltip.deletedRecordsSupport"
                dataOptions={deletedRecordsSupportSelectValues(intl)}
                component={Select}
              />
              <RowComponent
                data-test-suppressed-records-processing
                id="suppressedRecordsProcessing"
                label="ui-oai-pmh.settings.behavior.label.suppressedRecordsProcessing"
                tooltip="ui-oai-pmh.settings.behavior.tooltip.suppressedRecordsProcessing"
                dataOptions={suppressedRecordsProcessingSelectValues(intl)}
                component={Select}
              />
              <RowComponent
                data-test-errors-processing
                id="errorsProcessing"
                label="ui-oai-pmh.settings.behavior.label.errorsProcessing"
                tooltip="ui-oai-pmh.settings.behavior.tooltip.errorsProcessing"
                dataOptions={errorsProcessingSelectValues(intl)}
                component={Select}
              />
            </Pane>
          </form>
        )}
      </IntlConsumer>
    );
  }
}

export default stripesFinalForm({
  navigationCheck: true,
})(BehaviorForm);
