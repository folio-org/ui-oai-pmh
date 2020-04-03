import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Settings } from '@folio/stripes/smart-components';

import BehaviorForm from './BehaviorForm';
import TechnicalForm from './TechnicalForm';
import GeneralForm from './GeneralForm';

export default class OaiPmhSettings extends React.Component {
  pages = [
    {
      route: 'general',
      label: <FormattedMessage id="ui-oai-pmh.settings.general" />,
      component: GeneralForm,
    },
    {
      route: 'technical',
      label: <FormattedMessage id="ui-oai-pmh.settings.technical" />,
      component: TechnicalForm,
    },
    {
      route: 'behavior',
      label: <FormattedMessage id="ui-oai-pmh.settings.behavior" />,
      component: BehaviorForm,
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
