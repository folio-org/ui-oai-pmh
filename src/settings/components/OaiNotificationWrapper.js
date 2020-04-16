import React, { Component } from 'react';
import { get } from 'lodash';

import { stripesConnect } from '@folio/stripes/core';

import {
  getObjectFromResponseString,
  convertFromStringToBoolean,
} from '../util';

import OaiNotification from './OaiNotification';

class OaiNotificationWrapper extends Component {
  static manifest = Object.freeze({
    oaiService: {
      type: 'okapi',
      records: 'configs',
      accumulate: 'true',
      path: 'configurations/entries?query=(module=OAIPMH and configName=general)',
    },
  });

  isOaiServiceEnabled = () => {
    const value = getObjectFromResponseString(get(this.props, ['resources', 'oaiService', 'records']));

    return convertFromStringToBoolean(value.enableOaiService);
  }

  render() {
    return (
      <OaiNotification
        isOaiServiceEnabled={this.isOaiServiceEnabled()}
      />
    );
  }
}

export default stripesConnect(OaiNotificationWrapper);
