import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  Form,
} from 'react-final-form';

import {
  Pane,
  PaneFooter,
  TextField,
  Checkbox,
  Select,
  TextArea,
  Button,
} from '@folio/stripes/components';

import RowComponent from './RowComponent';

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
  };

  renderFooter = () => {
    return (
      <PaneFooter
        renderEnd={(
          <Button
            data-test-general-form-button-save
            type="submit"
            buttonStyle="primary paneHeaderNewButton"
            marginBottom0
          >
            <FormattedMessage id="stripes-core.button.save" />
          </Button>
        )}
      />
    );
  };

  render() {
    const {
      label,
    } = this.props;

    return (
      <Pane
        defaultWidth="50%"
        fluidContentWidth
        paneTitle={label}
        footer={this.renderFooter()}
      >
        <Form
          onSubmit={() => {
          }}
          render={() => (
            <form
              id="generalForm"
              onSubmit={() => {
              }}
            >
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
                id="repositoryName"
                label="ui-oai-pmh.settings.general.label.repositoryName"
                tooltip="ui-oai-pmh.settings.general.tooltip.repositoryName"
                component={TextField}
              />
              <RowComponent
                data-test-base-url
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
                id="administratorEmail"
                label="ui-oai-pmh.settings.general.label.administratorEmail"
                tooltip="ui-oai-pmh.settings.general.tooltip.administratorEmail"
                component={TextArea}
              />
            </form>
          )}
        />
      </Pane>
    );
  }
}

export default GeneralForm;
