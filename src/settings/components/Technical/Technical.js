import React from 'react';
import { FormattedMessage } from 'react-intl';

import { ConfigManager } from '@folio/stripes/smart-components';
import { useStripes } from '@folio/stripes/core';

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

const Technical = () => {
  const stripes = useStripes();
  const Manager = stripes.connect(ConfigManager);

  const getInitialValues = (data) => {
    const value = getObjectFromResponseString(data);

    return {
      ...value,
      enableValidation: convertFromStringToBoolean(value.enableValidation),
      formattedOutput: convertFromStringToBoolean(value.formattedOutput),
    };
  };

  const normalize = (data) => {
    const value = {
      ...data,
      enableValidation: convertFromBooleanToString(data.enableValidation),
      formattedOutput: convertFromBooleanToString(data.formattedOutput),
    };

    return dataObjectToString(value);
  };

  return (
    <Manager
      label={<FormattedMessage id="ui-oai-pmh.settings.technical.title" />}
      moduleName={MODULE_NAME}
      configName={TECHNICAL_CONFIG_NAME}
      getInitialValues={getInitialValues}
      configFormComponent={TechnicalForm}
      stripes={stripes}
      onBeforeSave={normalize}
    />
  );
};

export default Technical;
