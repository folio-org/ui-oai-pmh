import { FormattedMessage } from 'react-intl';

import { Layout, LoadingPane } from '@folio/stripes/components';

import GeneralForm from './components/GeneralForm';
import { GENERAL_CONFIG_NAME, FILL_PANE_WIDTH } from '../../constants';
import { useConfigurationManager } from '../../hooks';

const General = () => {
  const { config, isConfigsLoading, handleSubmit, stripes } = useConfigurationManager(GENERAL_CONFIG_NAME);

  if (isConfigsLoading) {
    return (
      <LoadingPane defaultWidth={FILL_PANE_WIDTH} />
    );
  }

  return (
    <Layout className="full">
      <GeneralForm
        label={<FormattedMessage id="ui-oai-pmh.settings.general.title" />}
        onSubmit={handleSubmit}
        initialValues={config?.configValue}
        stripes={stripes}
      />
    </Layout>
  );
};

export default General;
