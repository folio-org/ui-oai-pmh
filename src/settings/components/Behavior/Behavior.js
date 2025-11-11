import React from 'react';
import { FormattedMessage } from 'react-intl';

import { LoadingPane } from '@folio/stripes/components';

import BehaviorForm from './components/BehaviorForm';
import { BEHAVIOR_CONFIG_NAME, DEFAULT_PANE_WIDTH } from '../../constants';
import { useConfigurationManager } from '../../hooks';

const Behavior = () => {
  const { config, isConfigsLoading, handleSubmit, stripes } = useConfigurationManager(BEHAVIOR_CONFIG_NAME);

  if (isConfigsLoading) {
    return (
      <LoadingPane defaultWidth={DEFAULT_PANE_WIDTH} />
    );
  }

  return (
    <BehaviorForm
      label={<FormattedMessage id="ui-oai-pmh.settings.behavior.title" />}
      onSubmit={handleSubmit}
      initialValues={config?.configValue}
      stripes={stripes}
    />
  );
};

export default Behavior;

