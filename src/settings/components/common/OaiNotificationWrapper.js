import React from 'react';

import { getObjectFromResponseString, convertFromStringToBoolean } from '../../util';
import OaiNotification from './OaiNotification/OaiNotification';
import { useConfiguration } from '../../hooks';
import { GENERAL_CONFIG_NAME, MODULE_NAME } from '../../constants';


const OaiNotificationWrapper = () => {
  const { configs } = useConfiguration({
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
