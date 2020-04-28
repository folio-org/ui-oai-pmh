import React, { Component } from 'react';
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

import {
  OaiNotification,
  RowComponent,
  SaveButton,
  GeneralFormValidator,
} from './components';

import css from './Form.css';

const TIME_GRANULARITY_SHORT_FORMAT = 'YYYY-MM-DD';
const TIME_GRANULARITY_FULL_FORMAT = 'YYYY-MM-DDThh:mm:ssZ';
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

class GeneralForm extends Component {
  static propTypes = {
    label: PropTypes.node.isRequired,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
    form: PropTypes.shape({
      getState: PropTypes.func.isRequired,
    }),
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
            data-test-general-form-button-save
            disabled={disabled}
            showTooltip={!stripes.hasPerm('ui-oai-pmh.edit')}
          />
        )}
      />
    );
  };

  isOaiServiceEnabled = () => {
    const {
      values: {
        enableOaiService,
      },
    } = this.props.form.getState();

    return enableOaiService;
  }

  render() {
    const {
      label,
      handleSubmit,
    } = this.props;

    return (
      <form
        id="generalForm"
        noValidate
        className={css.form}
        onSubmit={handleSubmit}
      >
        <Pane
          defaultWidth="50%"
          fluidContentWidth
          paneTitle={label}
          footer={this.renderFooter()}
        >
          <OaiNotification
            isOaiServiceEnabled={this.isOaiServiceEnabled()}
          />
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
            required
            id="repositoryName"
            label="ui-oai-pmh.settings.general.label.repositoryName"
            tooltip="ui-oai-pmh.settings.general.tooltip.repositoryName"
            component={TextField}
          />
          <RowComponent
            data-test-base-url
            required
            id="baseUrl"
            label="ui-oai-pmh.settings.general.label.baseUrl"
            tooltip="ui-oai-pmh.settings.general.tooltip.baseUrl"
            component={TextField}
          />
          <RowComponent
            data-test-time-granularity
            id="timeGranularity"
            label="ui-oai-pmh.settings.general.label.timeGranularity"
            tooltip="ui-oai-pmh.settings.general.tooltip.timeGranularity"
            dataOptions={TIME_GRANULARITY_SELECT_VALUES}
            component={Select}
          />
          <RowComponent
            data-test-administrator-email
            required
            id="administratorEmail"
            label="ui-oai-pmh.settings.general.label.administratorEmail"
            tooltip="ui-oai-pmh.settings.general.tooltip.administratorEmail"
            component={TextArea}
          />
        </Pane>
      </form>
    );
  }
}

export default stripesFinalForm({
  navigationCheck: true,
  validateOnBlur: true,
  validate: GeneralFormValidator,
})(GeneralForm);
