import React from 'react';

import { getObjectFromResponseString, convertFromStringToBoolean } from '../../util';
import OaiNotification from './OaiNotification/OaiNotification';
import { useConfigurations } from '../../hooks/useConfigurations';
import { GENERAL_CONFIG_NAME, MODULE_NAME } from '../../constants';


const OaiNotificationWrapper = () => {
  const { configs } = useConfigurations({
    module: MODULE_NAME,
    configName: GENERAL_CONFIG_NAME
  });

  const value = getObjectFromResponseString(configs);
  const isOaiServiceEnabled = convertFromStringToBoolean(value.enableOaiService);

  return (
    <OaiNotification
      isOaiServiceEnabled={isOaiServiceEnabled}
    />
  );
};

export default OaiNotificationWrapper;
