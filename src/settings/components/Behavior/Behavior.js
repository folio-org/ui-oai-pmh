import React from 'react';
import { FormattedMessage } from 'react-intl';

import {
  stripesShape,
  withStripes,
} from '@folio/stripes/core';
import { ConfigManager } from '@folio/stripes/smart-components';

import BehaviorForm from './components/BehaviorForm';
import {
  getObjectFromResponseString,
  dataObjectToString,
} from '../../util';
import {
  MODULE_NAME,
  BEHAVIOR_CONFIG_NAME,
} from '../../constants';

class Behavior extends React.Component {
  static propTypes = {
    stripes: stripesShape.isRequired,
  };

  constructor(props) {
    super(props);
    this.configManager = props.stripes.connect(ConfigManager);
  }

  getInitialValues(data) {
    // eslint-disable-next-line no-useless-escape
    const parsedData = data[0].value === '{\"deletedRecordsSupport\":\"no\",\"suppressedRecordsProcessing\":false,\"errorsProcessing\":\"500\"}'
      // eslint-disable-next-line no-useless-escape
      ? [{ ...data[0], value: '{\"suppressedRecordsProcessing\":\"true\",\"deletedRecordsSupport\":\"persistent\",\"errorsProcessing\":\"200\"}' }]
      : data;

    return getObjectFromResponseString(parsedData);
  }

  normalize = (data) => {
    return dataObjectToString(data);
  };

  render() {
    return (
      <this.configManager
        label={<FormattedMessage id="ui-oai-pmh.settings.behavior.title" />}
        moduleName={MODULE_NAME}
        configName={BEHAVIOR_CONFIG_NAME}
        getInitialValues={this.getInitialValues}
        configFormComponent={BehaviorForm}
        stripes={this.props.stripes}
        onBeforeSave={this.normalize}
      />
    );
  }
}

export default withStripes(Behavior);
