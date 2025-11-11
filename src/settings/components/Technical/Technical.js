import React from 'react';
import { FormattedMessage } from 'react-intl';

import { LoadingPane } from '@folio/stripes/components';

import TechnicalForm from './components/TechnicalForm';
import { TECHNICAL_CONFIG_NAME, DEFAULT_PANE_WIDTH } from '../../constants';
import { useConfigurationManager } from '../../hooks';

const Technical = () => {
  const { config, isConfigsLoading, handleSubmit, stripes } = useConfigurationManager(TECHNICAL_CONFIG_NAME);

  if (isConfigsLoading) {
    return (
      <LoadingPane defaultWidth={DEFAULT_PANE_WIDTH} />
    );
  }

  return (
    <TechnicalForm
      label={<FormattedMessage id="ui-oai-pmh.settings.technical.title" />}
      onSubmit={handleSubmit}
      initialValues={config?.configValue}
      stripes={stripes}
    />
  );
};

export default Technical;

