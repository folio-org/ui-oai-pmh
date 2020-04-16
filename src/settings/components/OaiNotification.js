import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import css from './OaiNotification.css';

export default class OaiNotification extends Component {
  static propTypes = {
    isOaiServiceEnabled: PropTypes.bool.isRequired,
  };

  render() {
    const {
      isOaiServiceEnabled,
    } = this.props;

    return (
      !isOaiServiceEnabled && (
        <div
          data-test-oai-notification
          className={css.oaiNotification}
        >
          <FormattedMessage id="ui-oai-pmh.settings.all.oaiServiceIsDisabled" />
        </div>
      )
    );
  }
}
