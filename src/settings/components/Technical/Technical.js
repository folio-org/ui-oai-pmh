import React from 'react';
import { FormattedMessage } from 'react-intl';

import {
  stripesShape,
  withStripes,
} from '@folio/stripes/core';
import { ConfigManager } from '@folio/stripes/smart-components';

import TechnicalForm from './components/TechnicalForm';
import {
  getObjectFromResponseString,
  dataObjectToString,
  convertFromStringToBoolean,
  convertFromBooleanToString,
} from '../../util';
import {
  MODULE_NAME,
  TECHNICAL_CONFIG_NAME,
} from '../../constants';

class Technical extends React.Component {
  static propTypes = {
    stripes: stripesShape.isRequired,
  };

  constructor(props) {
    super(props);
    this.configManager = props.stripes.connect(ConfigManager);
  }

  getInitialValues(data) {
    const value = getObjectFromResponseString(data);

    return {
      ...value,
      enableValidation: convertFromStringToBoolean(value.enableValidation),
      formattedOutput: convertFromStringToBoolean(value.formattedOutput),
    };
  }

  normalize = (data) => {
    const value = {
      ...data,
      enableValidation: convertFromBooleanToString(data.enableValidation),
      formattedOutput: convertFromBooleanToString(data.formattedOutput),
    };

    return dataObjectToString(value);
  };

  render() {
    return (
      <this.configManager
        label={<FormattedMessage id="ui-oai-pmh.settings.technical.title" />}
        moduleName={MODULE_NAME}
        configName={TECHNICAL_CONFIG_NAME}
        getInitialValues={this.getInitialValues}
        configFormComponent={TechnicalForm}
        stripes={this.props.stripes}
        onBeforeSave={this.normalize}
      />
    );
  }
}

export default withStripes(Technical);
