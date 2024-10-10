import React, { useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useLocation } from 'react-router-dom';

import { Settings } from '@folio/stripes/smart-components';
import { TitleManager, useStripes } from '@folio/stripes/core';


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
  LOGS_ROUTE,
} from './constants';

const OaiPmhSettings = (props) => {
  const stripes = useStripes();
  const location = useLocation();
  const intl = useIntl();

  const getPage = (route, configName, component, perm) => ({
    route,
    label: <FormattedMessage id={`ui-oai-pmh.settings.${configName}.title`} />,
    component,
    perm,
    pageLabel: `ui-oai-pmh.settings.${configName}.title`
  });

  const pages = useMemo(() => [
    getPage(GENERAL_ROUTE, GENERAL_CONFIG_NAME, General),
    getPage(TECHNICAL_ROUTE, TECHNICAL_CONFIG_NAME, Technical),
    getPage(BEHAVIOR_ROUTE, BEHAVIOR_CONFIG_NAME, Behavior),
    getPage(LOGS_ROUTE, LOGS_CONFIG_NAME, Logs, 'ui-oai-pmh.settings.logs.view'),
  ], []);

  const findLabelByRoute = (path) => {
    const list = ['behavior', 'general', 'sets', 'technical', 'logs'];
    return intl.formatMessage({ id: `ui-oai-pmh.settings.${list.find(i => path.includes(i)) ?? 'title'}.manager` });
  };

  const recordLabel = findLabelByRoute(location.pathname);

  return (
    <TitleManager page={recordLabel} stripes={stripes}>
      <Settings
        {...props}
        navPaneWidth={SETTINGS_PANE_WIDTH}
        pages={pages}
        paneTitle={<FormattedMessage id="ui-oai-pmh.settings.title" />}
        intl={intl}
      />
    </TitleManager>
  );
};

export default OaiPmhSettings;
