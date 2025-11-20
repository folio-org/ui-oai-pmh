import React from 'react';
import { FormattedMessage } from 'react-intl';

import { useConfiguration } from '../../../hooks';
import { GENERAL_CONFIG_NAME } from '../../../constants';

import css from './OaiNotification.css';


const OaiNotification = () => {
  const { config } = useConfiguration(GENERAL_CONFIG_NAME);

  if (config.configValue?.enableOaiService) return null;

  return (
    <div
      className={css.oaiNotification}
      data-testid="oai-notification"
    >
      <FormattedMessage id="ui-oai-pmh.settings.all.oaiServiceIsDisabled" />
    </div>
  );
};

export default OaiNotification;
