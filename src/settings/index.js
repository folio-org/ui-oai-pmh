import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Settings } from '@folio/stripes/smart-components';

import {
  Behavior,
  General,
  Technical,
} from './components';
import SetsRoute from './routes';
import {
  BEHAVIOR_ROUTE,
  GENERAL_ROUTE,
  TECHNICAL_ROUTE,
  SETS_ROUTE,
  BEHAVIOR_CONFIG_NAME,
  GENERAL_CONFIG_NAME,
  TECHNICAL_CONFIG_NAME,
  SETS_CONFIG_NAME,
} from './constants';

export default class OaiPmhSettings extends React.Component {
  getPage = (route, configName, component) => ({
    route,
    label: <FormattedMessage id={`ui-oai-pmh.settings.${configName}.title`} />,
    component,
  });

  pages = [
    this.getPage(GENERAL_ROUTE, GENERAL_CONFIG_NAME, General),
    this.getPage(TECHNICAL_ROUTE, TECHNICAL_CONFIG_NAME, Technical),
    this.getPage(BEHAVIOR_ROUTE, BEHAVIOR_CONFIG_NAME, Behavior),
    this.getPage(SETS_ROUTE, SETS_CONFIG_NAME, SetsRoute),
  ];

  render() {
    return (
      <Settings
        {...this.props}
        pages={this.pages}
        paneTitle="OAI-PMH + (UIOAIPMH-8)"
      />
    );
  }
}
