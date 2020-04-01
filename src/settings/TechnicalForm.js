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
  Button,
} from '@folio/stripes/components';

import RowComponent from './RowComponent';

class TechnicalForm extends Component {
  static propTypes = {
    label: PropTypes.node.isRequired,
  };

  renderFooter = () => {
    return (
      <PaneFooter
        renderEnd={(
          <Button
            data-test-technical-form-button-save
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
              id="technicalForm"
              onSubmit={() => {
              }}
            >
              <RowComponent
                data-test-max-records-per-response
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
            </form>
          )}
        />
      </Pane>
    );
  }
}

export default TechnicalForm;
