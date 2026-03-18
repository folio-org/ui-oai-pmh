import React from 'react';
import PropTypes from 'prop-types';

import {
  Pane,
  PaneFooter,
  TextField,
  Checkbox,
  Select,
  TextArea,
} from '@folio/stripes/components';
import stripesFinalForm from '@folio/stripes/final-form';
import { useStripes } from '@folio/stripes/core';

import {
  OaiNotification,
  RowComponent,
  SaveButton,
} from '../../common';
import {
  DEFAULT_PANE_WIDTH,
  GENERAL_FORM_NAME,
  TIME_GRANULARITY_SHORT_FORMAT,
  TIME_GRANULARITY_FULL_FORMAT,
} from '../../../constants';
import GeneralFormValidator from './GeneralFormValidator';
import css from '../../common/Form.css';

const TIME_GRANULARITY_SELECT_VALUES = [
  {
    value: TIME_GRANULARITY_SHORT_FORMAT,
    label: TIME_GRANULARITY_SHORT_FORMAT,
  },
  {
    value: TIME_GRANULARITY_FULL_FORMAT,
    label: TIME_GRANULARITY_FULL_FORMAT,
  },
];

const GeneralForm = ({
  label,
  pristine,
  submitting,
  handleSubmit,
  initialValues,
}) => {
  const stripes = useStripes();

  const isOaiServiceSavedAsEnabled = !!initialValues.enableOaiService;
  const formatter = value => (initialValues.enableOaiService ? value : '');

  const renderFooter = () => {
    const disabled = pristine || submitting || !stripes.hasPerm('ui-oai-pmh.settings.edit');
    return (
      <PaneFooter
        renderEnd={
          <SaveButton
            data-test-general-form-button-save
            disabled={disabled}
            showTooltip={!stripes.hasPerm('ui-oai-pmh.settings.edit')}
          />
        }
      />
    );
  };

  const fieldDisabled = !isOaiServiceSavedAsEnabled;
  const disabledTooltipId = fieldDisabled
    ? 'ui-oai-pmh.settings.general.tooltip.fieldDisabled'
    : undefined;

  return (
    <form
      id={GENERAL_FORM_NAME}
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
        <OaiNotification isGeneral isOaiServiceEnabled={isOaiServiceSavedAsEnabled} />
        <RowComponent
          data-test-enable-oai-service
          id="enableOaiService"
          label="ui-oai-pmh.settings.general.label.enableOaiService"
          tooltip="ui-oai-pmh.settings.general.tooltip.enableOaiService"
          type="checkbox"
          component={Checkbox}
        />
        <RowComponent
          data-test-repository-name
          required={isOaiServiceSavedAsEnabled}
          disabled={fieldDisabled}
          disabledTooltip={disabledTooltipId}
          id="repositoryName"
          label="ui-oai-pmh.settings.general.label.repositoryName"
          tooltip={isOaiServiceSavedAsEnabled ? 'ui-oai-pmh.settings.general.tooltip.repositoryName' : undefined}
          component={TextField}
          format={formatter}
        />
        <RowComponent
          data-test-base-url
          required={isOaiServiceSavedAsEnabled}
          disabled={fieldDisabled}
          disabledTooltip={disabledTooltipId}
          id="baseUrl"
          label="ui-oai-pmh.settings.general.label.baseUrl"
          tooltip={isOaiServiceSavedAsEnabled ? 'ui-oai-pmh.settings.general.tooltip.baseUrl' : undefined}
          component={TextField}
          format={formatter}
        />
        <RowComponent
          data-test-time-granularity
          disabled={fieldDisabled}
          disabledTooltip={disabledTooltipId}
          id="timeGranularity"
          label="ui-oai-pmh.settings.general.label.timeGranularity"
          tooltip={isOaiServiceSavedAsEnabled ? 'ui-oai-pmh.settings.general.tooltip.timeGranularity' : undefined}
          dataOptions={TIME_GRANULARITY_SELECT_VALUES}
          component={Select}
        />
        <RowComponent
          data-test-administrator-email
          required={isOaiServiceSavedAsEnabled}
          disabled={fieldDisabled}
          disabledTooltip={disabledTooltipId}
          id="administratorEmail"
          label="ui-oai-pmh.settings.general.label.administratorEmail"
          tooltip={isOaiServiceSavedAsEnabled ? 'ui-oai-pmh.settings.general.tooltip.administratorEmail' : undefined}
          component={TextArea}
          format={formatter}
        />
      </Pane>
    </form>
  );
};

GeneralForm.propTypes = {
  label: PropTypes.node.isRequired,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
  form: PropTypes.shape({
    getState: PropTypes.func.isRequired,
  }).isRequired,
  initialValues: PropTypes.object,
};

export default stripesFinalForm({
  navigationCheck: true,
  validateOnBlur: true,
  validate: GeneralFormValidator,
})(GeneralForm);
