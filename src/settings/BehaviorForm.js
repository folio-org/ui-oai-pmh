import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  FormattedMessage,
} from 'react-intl';
import {
  Form,
} from 'react-final-form';

import {
  IntlConsumer,
} from '@folio/stripes/core';
import {
  Pane,
  PaneFooter,
  Select,
  Button,
} from '@folio/stripes/components';

import RowComponent from './RowComponent';

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
    value: true,
    label: formatMessage({ id: 'ui-oai-pmh.settings.behavior.suppressedRecordsProcessing.true' }),
  },
  {
    value: false,
    label: formatMessage({ id: 'ui-oai-pmh.settings.behavior.suppressedRecordsProcessing.false' }),
  },
];

const errorsProcessingSelectValues = ({ formatMessage }) => [
  {
    value: '200',
    label: formatMessage({ id: 'ui-oai-pmh.settings.behavior.errorsProcessing.200' }),
  },
  {
    value: 'error',
    label: formatMessage({ id: 'ui-oai-pmh.settings.behavior.errorsProcessing.error' }),
  },
];

class BehaviorForm extends Component {
  static propTypes = {
    label: PropTypes.node.isRequired,
  };

  renderFooter = () => {
    return (
      <PaneFooter
        renderEnd={(
          <Button
            data-test-behavior-form-button-save
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
      <IntlConsumer>
        {intl => (
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
                  id="behaviorForm"
                  onSubmit={() => {
                  }}
                >
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
                </form>
              )}
            />
          </Pane>
        )}
      </IntlConsumer>
    );
  }
}

export default BehaviorForm;
