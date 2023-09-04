import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';

import { Settings } from '@folio/stripes/smart-components';

import { TitleManager, stripesShape } from '@folio/stripes/core';
import PropTypes from 'prop-types';
import {
  Behavior,
  General,
  Technical,
  Logs,
} from './components';
import {
  SETTINGS_PANE_WIDTH,
  BEHAVIOR_ROUTE,
  GENERAL_ROUTE,
  TECHNICAL_ROUTE,
  BEHAVIOR_CONFIG_NAME,
  GENERAL_CONFIG_NAME,
  TECHNICAL_CONFIG_NAME,
  LOGS_CONFIG_NAME,
  LOGS_ROUTE
} from './constants';

class OaiPmhSettings extends React.Component {
  static propTypes = {
    stripes: stripesShape.isRequired,
    intl: PropTypes.object,
    location: PropTypes.shape({
      pathname: PropTypes.string
    })
  };

  getPage = (route, configName, component, perm) => ({
    route,
    label: <FormattedMessage id={`ui-oai-pmh.settings.${configName}.title`} />,
    component,
    perm,
    pageLabel: `ui-oai-pmh.settings.${configName}.title`
  });

  pages = [
    this.getPage(GENERAL_ROUTE, GENERAL_CONFIG_NAME, General),
    this.getPage(TECHNICAL_ROUTE, TECHNICAL_CONFIG_NAME, Technical),
    this.getPage(BEHAVIOR_ROUTE, BEHAVIOR_CONFIG_NAME, Behavior),
    this.getPage(LOGS_ROUTE, LOGS_CONFIG_NAME, Logs, 'ui-oai-pmh.logs'),
  ];



  render() {
    const { intl, location : { pathname } } = this.props;

    const findLabelByRoute = (path) => {
      const list = ['behavior', 'general', 'sets', 'technical', 'logs'];
      return intl.formatMessage({ id:`ui-oai-pmh.settings.${list.find(i => path.includes(i)) ?? 'title'}.manager` });
    };

    const recordLabel = findLabelByRoute(pathname);

    return (
      <TitleManager page={recordLabel} stripes={this.props.stripes}>
        <Settings
          {...this.props}
          navPaneWidth={SETTINGS_PANE_WIDTH}
          pages={this.pages}
          paneTitle={<FormattedMessage id="ui-oai-pmh.settings.title" />}
        />
      </TitleManager>
    );
  }
}

export default injectIntl(OaiPmhSettings);
