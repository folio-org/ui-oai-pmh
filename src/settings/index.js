import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Settings } from '@folio/stripes/smart-components';

import Behavior from './Behavior';
import Technical from './Technical';
import General from './General';

export default class OaiPmhSettings extends React.Component {
  pages = [
    {
      route: 'general',
      label: <FormattedMessage id="ui-oai-pmh.settings.general" />,
      component: General,
    },
    {
      route: 'technical',
      label: <FormattedMessage id="ui-oai-pmh.settings.technical" />,
      component: Technical,
    },
    {
      route: 'behavior',
      label: <FormattedMessage id="ui-oai-pmh.settings.behavior" />,
      component: Behavior,
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
