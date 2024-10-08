import React from 'react';
import PropTypes from 'prop-types';

import {
  Pane,
  PaneFooter,
  TextField,
  Checkbox,
} from '@folio/stripes/components';
import stripesFinalForm from '@folio/stripes/final-form';
import { useStripes } from '@folio/stripes/core';

import {
  OaiNotificationWrapper,
  RowComponent,
  SaveButton,
} from '../../common';
import TechnicalFormValidator from './TechnicalFormValidator';
import {
  DEFAULT_PANE_WIDTH,
  TECHNICAL_FORM_NAME,
} from '../../../constants';
import css from '../../common/Form.css';


const TechnicalForm = ({
  label,
  pristine,
  submitting,
  handleSubmit,
}) => {
  const stripes = useStripes();

  const renderFooter = () => {
    const disabled = pristine || submitting || !stripes.hasPerm('ui-oai-pmh.settings.edit');
    return (
      <PaneFooter
        renderEnd={(
          <SaveButton
            data-test-technical-form-button-save
            disabled={disabled}
            showTooltip={!stripes.hasPerm('ui-oai-pmh.settings.edit')}
          />
        )}
      />
    );
  };

  return (
    <form
      id={TECHNICAL_FORM_NAME}
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
          data-test-max-records-per-response
          required
          id="maxRecordsPerResponse"
          label="ui-oai-pmh.settings.technical.label.maxRecordsPerResponse"
          tooltip="ui-oai-pmh.settings.technical.tooltip.maxRecordsPerResponse"
          component={TextField}
        />
        <RowComponent
          data-test-enable-validation
          id="enableValidation"
          label="ui-oai-pmh.settings.technical.label.enableValidation"
          tooltip="ui-oai-pmh.settings.technical.tooltip.enableValidation"
          type="checkbox"
          component={Checkbox}
        />
        <RowComponent
          data-test-formatted-output
          id="formattedOutput"
          label="ui-oai-pmh.settings.technical.label.formattedOutput"
          tooltip="ui-oai-pmh.settings.technical.tooltip.formattedOutput"
          type="checkbox"
          component={Checkbox}
        />
      </Pane>
    </form>
  );
};

TechnicalForm.propTypes = {
  label: PropTypes.node.isRequired,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
  stripes: PropTypes.shape({
    hasPerm: PropTypes.func.isRequired,
  }).isRequired,
};

export default stripesFinalForm({
  navigationCheck: true,
  validateOnBlur: true,
  validate: TechnicalFormValidator,
})(TechnicalForm);
