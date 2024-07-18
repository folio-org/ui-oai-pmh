import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import css from './OaiNotification.css';

const OaiNotification = ({ isOaiServiceEnabled }) => {
  return (
    !isOaiServiceEnabled && (
      <div
        className={css.oaiNotification}
        data-testid="oai-notification"
      >
        <FormattedMessage id="ui-oai-pmh.settings.all.oaiServiceIsDisabled" />
      </div>
    )
  );
};

OaiNotification.propTypes = {
  isOaiServiceEnabled: PropTypes.bool.isRequired,
};

export default OaiNotification;
