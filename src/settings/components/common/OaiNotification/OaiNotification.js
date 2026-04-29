import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { MessageBanner } from '@folio/stripes/components';

import { useConfiguration } from '../../../hooks';
import { GENERAL_CONFIG_NAME } from '../../../constants';

import css from './OaiNotification.css';

const boldTag = (chunks) => <b>{chunks}</b>;

const OaiNotification = ({ isGeneral = false, isOaiServiceEnabled: isOaiServiceEnabledProp }) => {
  const { config, isConfigsLoading } = useConfiguration(GENERAL_CONFIG_NAME);

  const isEnabled = isOaiServiceEnabledProp ?? config?.configValue?.enableOaiService;

  if (isConfigsLoading || isEnabled) return null;

  const messageId = isGeneral
    ? 'ui-oai-pmh.settings.general.oaiServiceIsDisabled'
    : 'ui-oai-pmh.settings.other.oaiServiceIsDisabled';

  return (
    <div
      className={css.oaiNotification}
      data-testid="oai-notification"
    >
      <MessageBanner type="warning">
        <FormattedMessage
          id={messageId}
          values={{ b: boldTag }}
        />
      </MessageBanner>
    </div>
  );
};

OaiNotification.propTypes = {
  isGeneral: PropTypes.bool,
  isOaiServiceEnabled: PropTypes.bool,
};

export default OaiNotification;
