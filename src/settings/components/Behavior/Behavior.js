import React from 'react';
import { FormattedMessage } from 'react-intl';

import { ConfigManager } from '@folio/stripes/smart-components';
import { useStripes } from '@folio/stripes/core';

import BehaviorForm from './components/BehaviorForm';
import {
  getObjectFromResponseString,
  dataObjectToString,
} from '../../util';
import {
  MODULE_NAME,
  BEHAVIOR_CONFIG_NAME,
} from '../../constants';

const Behavior = () => {
  const stripes = useStripes();
  const Manager = stripes.connect(ConfigManager);

  const getInitialValues = (data) => {
    return getObjectFromResponseString(data);
  };

  const normalize = (data) => {
    return dataObjectToString(data);
  };

  return (
    <Manager
      label={<FormattedMessage id="ui-oai-pmh.settings.behavior.title" />}
      moduleName={MODULE_NAME}
      configName={BEHAVIOR_CONFIG_NAME}
      getInitialValues={getInitialValues}
      configFormComponent={BehaviorForm}
      stripes={stripes}
      onBeforeSave={normalize}
    />
  );
};

export default Behavior;
