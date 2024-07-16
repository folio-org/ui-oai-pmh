import React from 'react';
import { FormattedMessage } from 'react-intl';

import { ConfigManager } from '@folio/stripes/smart-components';
import { useStripes } from '@folio/stripes/core';

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

const General = () => {
  const stripes = useStripes();
  const Manager = stripes.connect(ConfigManager);

  const getInitialValues = (data) => {
    const value = getObjectFromResponseString(data);

    return {
      ...value,
      enableOaiService: value.enableOaiService ? convertFromStringToBoolean(value.enableOaiService) : true,
    };
  };

  const normalize = (data) => {
    const value = {
      ...data,
      enableOaiService: convertFromBooleanToString(data.enableOaiService),
    };

    return dataObjectToString(value);
  };

  return (
    <Manager
      label={<FormattedMessage id="ui-oai-pmh.settings.general.title" />}
      moduleName={MODULE_NAME}
      configName={GENERAL_CONFIG_NAME}
      getInitialValues={getInitialValues}
      configFormComponent={GeneralForm}
      stripes={stripes}
      onBeforeSave={normalize}
    />
  );
};

export default General;
