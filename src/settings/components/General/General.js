import React from 'react';
import { FormattedMessage } from 'react-intl';

import {
  stripesShape,
  withStripes,
} from '@folio/stripes/core';
import { ConfigManager } from '@folio/stripes/smart-components';

import GeneralForm from './components/GeneralForm';
import {
  getObjectFromResponseString,
  dataObjectToString,
  convertFromStringToBoolean,
  convertFromBooleanToString,
} from '../../util';
import {
  MODULE_NAME,
  GENERAL_CONFIG_NAME,
} from '../../constants';

class General extends React.Component {
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
      enableOaiService: value.enableOaiService ? convertFromStringToBoolean(value.enableOaiService) : true,
    };
  }

  normalize = (data) => {
    const value = {
      ...data,
      enableOaiService: convertFromBooleanToString(data.enableOaiService),
    };

    return dataObjectToString(value);
  };

  render() {
    return (
      <this.configManager
        label={<FormattedMessage id="ui-oai-pmh.settings.general.title" />}
        moduleName={MODULE_NAME}
        configName={GENERAL_CONFIG_NAME}
        getInitialValues={this.getInitialValues}
        configFormComponent={GeneralForm}
        stripes={this.props.stripes}
        onBeforeSave={this.normalize}
      />
    );
  }
}

export default withStripes(General);
