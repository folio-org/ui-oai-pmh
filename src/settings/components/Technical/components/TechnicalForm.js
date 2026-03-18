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
  RowComponent,
  SaveButton,
} from '../../common';
import OaiNotification from '../../common/OaiNotification';
import TechnicalFormValidator from './TechnicalFormValidator';
import { DEFAULT_PANE_WIDTH,
  TECHNICAL_FORM_NAME,
  GENERAL_CONFIG_NAME } from '../../../constants';
import { useConfiguration } from '../../../hooks';

import css from '../../common/Form.css';


const TechnicalForm = ({
  label,
  pristine,
  submitting,
  handleSubmit,
}) => {
  const stripes = useStripes();
  const { config: generalConfig } = useConfiguration(GENERAL_CONFIG_NAME);
  const isOaiServiceEnabled = !!generalConfig?.configValue?.enableOaiService;

  const fieldDisabled = !isOaiServiceEnabled;
  const disabledTooltipId = fieldDisabled
    ? 'ui-oai-pmh.settings.nonGeneral.tooltip.fieldDisabled'
    : undefined;

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
        <OaiNotification />
        <RowComponent
          data-test-max-records-per-response
          required={isOaiServiceEnabled}
          disabled={fieldDisabled}
          disabledTooltip={disabledTooltipId}
          id="maxRecordsPerResponse"
          label="ui-oai-pmh.settings.technical.label.maxRecordsPerResponse"
          tooltip={isOaiServiceEnabled ? 'ui-oai-pmh.settings.technical.tooltip.maxRecordsPerResponse' : undefined}
          component={TextField}
          format={value => (isOaiServiceEnabled ? value : '50')}
        />
        <RowComponent
          data-test-enable-validation
          disabled={fieldDisabled}
          disabledTooltip={disabledTooltipId}
          id="enableValidation"
          label="ui-oai-pmh.settings.technical.label.enableValidation"
          tooltip={isOaiServiceEnabled ? 'ui-oai-pmh.settings.technical.tooltip.enableValidation' : undefined}
          type="checkbox"
          component={Checkbox}
        />
        <RowComponent
          data-test-formatted-output
          disabled={fieldDisabled}
          disabledTooltip={disabledTooltipId}
          id="formattedOutput"
          label="ui-oai-pmh.settings.technical.label.formattedOutput"
          tooltip={isOaiServiceEnabled ? 'ui-oai-pmh.settings.technical.tooltip.formattedOutput' : undefined}
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
};

export default stripesFinalForm({
  navigationCheck: true,
  validateOnBlur: true,
  validate: TechnicalFormValidator,
})(TechnicalForm);
