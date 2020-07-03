import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Settings } from '@folio/stripes/smart-components';

import {
  Behavior,
  General,
  Technical,
} from './components';
import SetsRoute from './routes';

export default class OaiPmhSettings extends React.Component {
  pages = [
    {
      route: 'general',
      label: <FormattedMessage id="ui-oai-pmh.settings.general.title" />,
      component: General,
    },
    {
      route: 'technical',
      label: <FormattedMessage id="ui-oai-pmh.settings.technical.title" />,
      component: Technical,
    },
    {
      route: 'behavior',
      label: <FormattedMessage id="ui-oai-pmh.settings.behavior.title" />,
      component: Behavior,
    },
    {
      route: 'sets',
      label: <FormattedMessage id="ui-oai-pmh.settings.sets.title" />,
      component: SetsRoute,
    },
  ];

  render() {
    return (
      <Settings
        {...this.props}
        pages={this.pages}
        paneTitle={<FormattedMessage id="ui-oai-pmh.settings.title" />}
      />
    );
  }
}
